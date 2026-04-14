# Testing and Validations Strategy

This document outlines the testing parameters and data validation requirements implemented within the AI Resume Builder project forms.

## 1. Personal Details Form Validation

| Field Name | Type | Required | Validation Rules / Logic | Max Length | Error Message/Feedback |
| :--- | :---: | :---: | :--- | :---: | :--- |
| **First Name** | Text | ✅ Yes | Must not be empty. | 100 | HTML5 Default (`required`) |
| **Last Name** | Text | ✅ Yes | Must not be empty. | 100 | HTML5 Default (`required`) |
| **Job Title** | Text | ✅ Yes | Must not be empty. | 200 | HTML5 Default (`required`) |
| **Address** | Text | ✅ Yes | Must not be empty. | 500 | HTML5 Default (`required`) |
| **Phone** | Tel | ✅ Yes | Must match RegEx `^\+?[\d\s()-]{7,15}$`. Minimum 7 digits, max 15 digits combined. | 20 | "Invalid phone number..." / Red border ring |
| **Email** | Email | ✅ Yes | Must match standard Email RegEx: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$` | 255 | "Invalid email address (e.g., name@example.com)" |

## 2. Professional Experience Form Validation

| Field Name | Type | Required | Validation Rules / Logic | Max Length | Error Message/Feedback |
| :--- | :---: | :---: | :--- | :---: | :--- |
| **Position Title** | Text | ✅ Yes | Must not be empty. | - | Toast: "Position title... required" |
| **Company Name** | Text | ✅ Yes | Must not be empty. | - | Toast: "company name... required" |
| **City** | Text | ❌ No | Standard text input. | - | - |
| **State** | Text | ❌ No | Standard text input. | - | - |
| **Start Date** | Date | ✅ Yes | Cannot exceed current date (`max={today}`). | - | Toast: "... start date are required" |
| **End Date** | Date | ❌ No | Must be **AFTER** the Start Date. Max is current date (`max={today}`). | - | "End date must be after start date" |
| **Work Summary** | Rich Text| ❌ No | Valid HTML formatting from TextEditor. | - | - |

## 3. Education Form Validation

| Field Name | Type | Required | Validation Rules / Logic | Max Length | Error Message/Feedback |
| :--- | :---: | :---: | :--- | :---: | :--- |
| **University Name**| Text | ✅ Yes | Must not be empty. | 300 | Toast: "University, degree... required" |
| **Degree** | Text | ✅ Yes | Must not be empty. | 100 | Toast: "University, degree... required" |
| **Major** | Text | ✅ Yes | Must not be empty. | 200 | Toast: "University, degree... required" |
| **Start Date** | Date | ✅ Yes | Cannot exceed current date (`max={today}`). | - | Toast: "... start date are required" |
| **End Date** | Date | ❌ No | Must be **AFTER** the Start Date. | - | "End date must be after start date" |
| **Description** | Text | ❌ No | Additional notes/honors. | 2000 | - |

## 4. Skills Form Validation

| Field Name | Type | Required | Validation Rules / Logic | Max Length | Error Message/Feedback |
| :--- | :---: | :---: | :--- | :---: | :--- |
| **Skill Name** | Text | ✅ Yes | Cannot be completely empty or whitespace (`trim() !== ""`).| 100 | Toast: "Skill name is required" |
| **Proficiency** | Number | ✅ Yes| Must be between 0 and 5. | - | Toast: "Rating must be between 0 and 5" |

## 5. Summary Form Validation

| Field Name | Type | Required | Validation Rules / Logic | Max Length | Error Message/Feedback |
| :--- | :---: | :---: | :--- | :---: | :--- |
| **Summary** | Text | ✅ Yes | Must not be empty. | - | HTML5 Default (`required`) |

---

## Global Save Validation & Error Handling
- Before persisting any data via `GlobalApi.UpdateResumeDetail`, the app iterates over **all list entries** (e.g. `Experience`, `Education`, `Skills`) to check constraints dynamically.
- `toast` notifications from `sonner` intercept saving flows and display transient error feedback matching the specific index/instance with erroneous data (e.g., `toast.error("Experience #2: End date must be after start date")`).
