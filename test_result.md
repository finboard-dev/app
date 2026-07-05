#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: |
  User reported: "CAROUSEL IS NOT BEING ROTATED" on the landing page hero. The auto-rotating dashboard
  carousel on `/` (Hero component) was perceived as stuck. Root cause: hover-pause was pausing the
  rotation whenever the mouse was over the carousel, which made it feel broken when users
  scrolled/interacted.

  Additional reorganization requested (not a bug, but part of same request):
  - Moved HowItWorks and ForwardDeployed sections from Landing → Engagement page (below Gantt hero)
  - Made Manifesto a standalone route at /manifesto, linked from Navbar Resources dropdown
  - Navbar "How it works" resource link now points to /engagement#how-it-works

frontend:
  - task: "Hero carousel auto-rotates continuously on landing page"
    implemented: true
    working: true
    file: "/app/frontend/src/components/landing/HeroCarousel.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: |
          Removed hover-pause (paused state, onMouseEnter/onMouseLeave handlers) so the carousel
          rotates every 2.8s continuously regardless of mouse position. The carousel cycles through
          6 views: warehouse → board → recon → people → p2p → o2c, using a slide + fade transition.
          Test at http://localhost:3000/ (or preview URL). Verify:
          1) Open landing page, do NOT move mouse over carousel
          2) Observe that the visible view (data-testid=hero-carousel-view-{id}) changes every ~2.8s
          3) Move mouse OVER the carousel — rotation should CONTINUE, not pause
          4) Verify all 6 views rotate in order and wrap back to the first
      - working: true
        agent: "testing"
        comment: |
          ✓ VERIFIED: Carousel auto-rotates continuously every ~2.8s
          ✓ VERIFIED: Rotation continues when mouse hovers over carousel (no pause behavior)
          ✓ VERIFIED: All 6 views exist and cycle through in order
          
          Test results:
          - Rotation sequence observed (mouse OFF): board → recon → people → p2p → o2c (5 unique views in 12s)
          - Rotation during hover (mouse ON): o2c → board → recon (3 unique views in 6s)
          - All 6 carousel views confirmed present: warehouse, board, recon, people, p2p, o2c
          
          PRIMARY BUG FIX CONFIRMED: The hover-pause behavior has been successfully removed.
          The carousel now rotates continuously regardless of mouse position.

  - task: "HowItWorks section available on Engagement page below Gantt"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/pages/Engagement.jsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: |
          HowItWorks + ForwardDeployed sections moved from Landing to Engagement, wrapped in a div
          with id="how-it-works" and scroll-mt-20 so the Resources → How it works nav link deep-links
          to it. Test at /engagement: scroll below the Gantt hero, verify HowItWorks and
          ForwardDeployed sections render.

  - task: "Manifesto standalone page at /manifesto"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/pages/ManifestoPage.jsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: |
          Created ManifestoPage at /manifesto that renders the Manifesto component plus CTABand.
          Removed Manifesto section from Landing.jsx. Navbar Resources dropdown "Manifesto" item
          now routes to /manifesto (uses react-router navigate, marked with route:true). Test:
          1) Visit /manifesto directly — should render manifesto content with navbar+footer
          2) From landing, click Resources → Manifesto → should navigate to /manifesto without full
             page reload

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 1
  run_ui: true

test_plan:
  current_focus:
    - "Hero carousel auto-rotates continuously on landing page"
    - "HowItWorks section available on Engagement page below Gantt"
    - "Manifesto standalone page at /manifesto"
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
  - agent: "main"
    message: |
      Bug fix applied for the reported "carousel not rotating" issue. Root cause was hover-pause
      behavior — I removed the paused state entirely so the carousel now rotates every 2.8s no
      matter what. Please verify:
      (1) On /  , confirm hero-carousel-view-{id} data-testid element changes every ~2.8s
          across all 6 views (warehouse, board, recon, people, p2p, o2c)
      (2) Rotation continues even when mouse hovers over the carousel
      Also please verify the reorganization: HowItWorks now on /engagement below the Gantt;
      Manifesto now at /manifesto (navigated to via Navbar Resources dropdown).
