Feature: Hogwarts Class Schedule Management
  As a school administrator
  I want to manage teacher attendance and see updated class schedules
  So that I can ensure all students have appropriate teacher assignments

  Background:
    Given the following teacher hierarchy exists:
      | Teacher              | Role              | Subject        | Reports To           |
      | Professor Dumbledore | Headmaster       |                |                      |
      | Minerva McGonagall   | Headmistress     |                | Professor Dumbledore |
      | Rubeus Hagrid        | Standby Professor | Potions Master | Minerva McGonagall  |
      | Horace Slughorn      | Professor         | Potions Master | Rubeus Hagrid       |
      | Severus Snape        | Professor         | Potions Master | Rubeus Hagrid       |

    And the following student allocations exist:
      | Student           | Subject        | Teacher         |
      | Harry Potter      | Potions Master | Horace Slughorn |
      | Hermione Granger  | Potions Master |                 |
      | Ron Weasley       | Potions Master | Severus Snape   |
      | Draco Malfoy      | Potions Master | Horace Slughorn |
      | Padma Patil       | Potions Master |                 |
      | Luna Lovegood     | Potions Master | Severus Snape   |

    And all teachers are initially present

  Scenario: Unassigned student gets standby professor
    When I view the current schedule
    Then "Hermione Granger" should be assigned to "Rubeus Hagrid"
    And "Padma Patil" should be assigned to "Rubeus Hagrid"

  Scenario: Teacher absence triggers hierarchy-based reassignment
    When "Horace Slughorn" is marked as "Absent"
    Then "Harry Potter" should be assigned to "Rubeus Hagrid"
    And "Draco Malfoy" should be assigned to "Rubeus Hagrid"
    But "Ron Weasley" should still be assigned to "Severus Snape"

  Scenario: Multiple teacher absences trigger hierarchical fallback
    When the following teachers are marked as absent:
      | Teacher         |
      | Horace Slughorn |
      | Severus Snape   |
      | Rubeus Hagrid   |
    Then all students should be assigned to "Minerva McGonagall"

  Scenario: All teachers absent results in unassigned students
    When all teachers are marked as "Absent"
    Then all students should be marked as "Not Assigned"