#!/bin/bash

# Task Dashboard Viewer
# Displays all tasks from docs/Tasks/ in a formatted table
# Usage: bash scripts/show-tasks.sh

TASKS_DIR="docs/Tasks"

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
GRAY='\033[0;37m'
NC='\033[0m' # No Color

# Function to extract frontmatter value
get_frontmatter() {
  local file=$1
  local key=$2
  grep "^$key:" "$file" | sed "s/$key: //" | tr -d '"'
}

# Function to print status with color
status_color() {
  local status=$1
  case $status in
    complete)
      echo -e "${GREEN}✓ complete${NC}"
      ;;
    in_progress)
      echo -e "${BLUE}⟳ in_progress${NC}"
      ;;
    ready)
      echo -e "${YELLOW}▶ ready${NC}"
      ;;
    pending)
      echo -e "${GRAY}○ pending${NC}"
      ;;
    *)
      echo "$status"
      ;;
  esac
}

# Function to print priority with color
priority_color() {
  local priority=$1
  case $priority in
    high)
      echo -e "${RED}HIGH${NC}"
      ;;
    medium)
      echo -e "${YELLOW}MED${NC}"
      ;;
    low)
      echo -e "${GRAY}LOW${NC}"
      ;;
    *)
      echo "$priority"
      ;;
  esac
}

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  SvelteThree Task Dashboard${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# Parse task files and create arrays
declare -a ids titles statuses priorities descriptions agents dependencies

count=0
for task_file in "$TASKS_DIR"/*.md; do
  # Skip template file
  if [[ "$task_file" == *"_TEMPLATE"* ]]; then
    continue
  fi

  # Skip TASKS.md index
  if [[ "$task_file" == *"TASKS.md" ]]; then
    continue
  fi

  id=$(get_frontmatter "$task_file" "id")
  title=$(get_frontmatter "$task_file" "title")
  status=$(get_frontmatter "$task_file" "status")
  priority=$(get_frontmatter "$task_file" "priority")
  description=$(get_frontmatter "$task_file" "description")
  agent=$(get_frontmatter "$task_file" "assigned_agent")
  deps=$(get_frontmatter "$task_file" "dependencies")

  # Only add non-empty ids
  if [ ! -z "$id" ]; then
    ids[$count]="$id"
    titles[$count]="$title"
    statuses[$count]="$status"
    priorities[$count]="$priority"
    descriptions[$count]="$description"
    agents[$count]="$agent"
    dependencies[$count]="$deps"
    ((count++))
  fi
done

# Sort by status (ready first) then by priority
# This shows the queue order that the monitor will use

echo -e "${BLUE}READY TASKS (Auto-picked next)${NC}"
echo -e "${BLUE}─────────────────────────────────────────────────────────────${NC}"

ready_count=0
for i in "${!ids[@]}"; do
  if [[ "${statuses[$i]}" == "ready" ]]; then
    id="${ids[$i]}"
    title="${titles[$i]}"
    status="${statuses[$i]}"
    priority="${priorities[$i]}"

    echo -e "  ${YELLOW}[$id]${NC} $title"
    echo -e "     Status: $(status_color "$status") | Priority: $(priority_color "$priority")"
    echo ""
    ((ready_count++))
  fi
done

if [ $ready_count -eq 0 ]; then
  echo -e "  ${GRAY}No ready tasks${NC}"
  echo ""
fi

echo -e "${BLUE}PENDING TASKS (Waiting for approval)${NC}"
echo -e "${BLUE}─────────────────────────────────────────────────────────────${NC}"

pending_count=0
for i in "${!ids[@]}"; do
  if [[ "${statuses[$i]}" == "pending" ]]; then
    id="${ids[$i]}"
    title="${titles[$i]}"
    priority="${priorities[$i]}"
    deps="${dependencies[$i]}"

    echo -e "  ${GRAY}[$id]${NC} $title"
    echo -e "     Priority: $(priority_color "$priority")"
    if [[ ! -z "$deps" && "$deps" != "[]" ]]; then
      echo -e "     Blocked by: $deps"
    fi
    echo ""
    ((pending_count++))
  fi
done

if [ $pending_count -eq 0 ]; then
  echo -e "  ${GRAY}No pending tasks${NC}"
  echo ""
fi

echo -e "${BLUE}IN PROGRESS TASKS${NC}"
echo -e "${BLUE}─────────────────────────────────────────────────────────────${NC}"

inprog_count=0
for i in "${!ids[@]}"; do
  if [[ "${statuses[$i]}" == "in_progress" ]]; then
    id="${ids[$i]}"
    title="${titles[$i]}"

    echo -e "  ${BLUE}[$id]${NC} $title"
    echo ""
    ((inprog_count++))
  fi
done

if [ $inprog_count -eq 0 ]; then
  echo -e "  ${GRAY}No in-progress tasks${NC}"
  echo ""
fi

echo -e "${BLUE}COMPLETED TASKS${NC}"
echo -e "${BLUE}─────────────────────────────────────────────────────────────${NC}"

complete_count=0
for i in "${!ids[@]}"; do
  if [[ "${statuses[$i]}" == "complete" ]]; then
    id="${ids[$i]}"
    title="${titles[$i]}"

    echo -e "  ${GREEN}[$id]${NC} $title"
    echo ""
    ((complete_count++))
  fi
done

if [ $complete_count -eq 0 ]; then
  echo -e "  ${GRAY}No completed tasks${NC}"
  echo ""
fi

# Summary
echo -e "${BLUE}─────────────────────────────────────────────────────────────${NC}"
echo -e "Summary: ${YELLOW}$ready_count ready${NC} | ${GRAY}$pending_count pending${NC} | ${BLUE}$inprog_count in progress${NC} | ${GREEN}$complete_count complete${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""
