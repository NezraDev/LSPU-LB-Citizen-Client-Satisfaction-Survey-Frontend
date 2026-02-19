import type { Office } from "../types/survey.type";

export const offices: Office[] = [
  {
    id: "mds",
    name: "MEDICAL/DENTAL SERVICES (MDS)",
    services: [
      { name: "Routine Medical and Dental Services", category: "internal" },
      {
        name: "Annual Physical Examination of Faculty and Personnel",
        category: "internal",
      },
      {
        name: "Physical Examination of Incoming Freshmen Students",
        category: "internal",
      },
      { name: "Newly Hired Faculty and Personnel", category: "internal" },
    ],
  },
  {
    id: "library",
    name: "LIBRARY SERVICES",
    services: [
      { name: "Reference Assistance", category: "internal" },
      { name: "Borrowing of Books", category: "internal" },
      { name: "Internet Services", category: "internal" },
      { name: "Multimedia Services", category: "internal" },
      { name: "Issuance of Referral Letter", category: "internal" },
      { name: "Returning of Books", category: "internal" },
      { name: "Library Reference Service", category: "internal" },
    ],
  },
  {
    id: "hrmo",
    name: "HUMAN RESOURCE MANAGEMENT OFFICE (HRMO)",
    services: [
      { name: "Issuance of Service Records (SR)", category: "internal" },
      { name: "Issuance of Certificate of Employment", category: "internal" },
      { name: "Recruitment, Selection and Placement", category: "internal" },
      {
        name: "Prepare Contracts and Appointment of Employees",
        category: "internal",
      },
      { name: "Transaction with other agencies", category: "external" },
      { name: "Daily Time Record (DTR)", category: "internal" },
    ],
  },
  {
    id: "rds",
    name: "RESEARCH AND DEVELOPMENT SERVICES (RDS)",
    services: [
      {
        name: "Research Program/Project Implementation of LSPU Funded Research",
        category: "internal",
      },
      { name: "Student Researcher-Related Services", category: "internal" },
      { name: "Establishment of Linkages and Network", category: "external" },
      {
        name: "Technical Assistance for any Research Project",
        category: "internal/external",
      },
      { name: "Research Capability Building Activities", category: "internal" },
    ],
  },
  {
    id: "ets",
    name: "EXTENSION AND TRAINING SERVICES (ETS)",
    services: [
      {
        name: "Request for the Use of Learning Resource Center (LRC) for Viewing Electronic Materials",
        category: "internal",
      },
      {
        name: "Request for Training Services (Virtual or Online)",
        category: "external",
      },
      {
        name: "Program/Project Implementation with Partner Agencies",
        category: "external",
      },
      { name: "Request for IEC Materials", category: "external" },
      { name: "Request for Training Services", category: "external" },
    ],
  },
  {
    id: "smo",
    name: "SECURITY MANAGEMENT OFFICE (SMO)",
    services: [
      { name: "Receive / verify inquiry", category: "internal" },
      { name: "Public Assistance", category: "external" },
    ],
  },
  {
    id: "registrar",
    name: "REGISTRAR",
    services: [
      { name: "Enrollment", category: "internal" },
      { name: "Issuance of Transcript of Records", category: "internal" },
      { name: "Issuance of Transfer Credentials", category: "internal" },
      {
        name: "Issuance of Certifications/ CAV/ Authenticated Documents",
        category: "internal/external",
      },
    ],
  },
  {
    id: "accounting",
    name: "ACCOUNTING",
    services: [
      { name: "Assessment of Fees", category: "internal" },
      {
        name: "Releasing of Statement of Accounts/Balances/Payment History",
        category: "internal",
      },
      { name: "Request for Refund of Fees", category: "internal" },
    ],
  },
  {
    id: "cashier",
    name: "CASHIER",
    services: [
      { name: "Releasing of Checks/Cash", category: "internal" },
      { name: "Collection of Fees", category: "internal" },
    ],
  },
  {
    id: "osas",
    name: "OFFICE OF STUDENT AFFAIRS AND SERVICES (OSAS)",
    services: [
      { name: "Admission for New Students/Transferees", category: "internal" },
      { name: "Signing of Semestral Clearances", category: "internal" },
      {
        name: "Signing of General Clearances (Graduating Students)",
        category: "internal",
      },
      { name: "Signing of General Clearances (LATE)", category: "internal" },
      {
        name: "Application, Renewal and Recognition of Student Organizations",
        category: "internal",
      },
      { name: "ID Validation", category: "internal" },
    ],
  },
  {
    id: "sfa",
    name: "SCHOLARSHIP AND FINANCIAL ASSISTANCE (SFA)",
    services: [
      {
        name: "Processing of Scholarship and Financial Assistance",
        category: "internal",
      },
    ],
  },
  {
    id: "cas",
    name: "COLLEGE OF ARTS AND SCIENCES (CAS)",
    services: [
      { name: "Offering of Unscheduled Subjects", category: "internal" },
      { name: "Request for Overload Subject", category: "internal" },
      { name: "Crediting of Subjects", category: "internal" },
      {
        name: "Completion of INC/ Removal - Online System",
        category: "internal",
      },
      { name: "Signing of Faculty Clearance", category: "internal" },
      { name: "Student Admission Interview", category: "internal" },
    ],
  },
  {
    id: "cbaa",
    name: "COLLEGE OF BUSINESS ADMINISTRATION AND ACCOUNTANCY (CBAA)",
    services: [
      { name: "Offering of Unscheduled Subjects", category: "internal" },
      { name: "Request for Overload Subject", category: "internal" },
      { name: "Crediting of Subjects", category: "internal" },
      {
        name: "Completion of INC/ Removal - Online System",
        category: "internal",
      },
      { name: "Signing of Faculty Clearance", category: "internal" },
      { name: "Student Admission Interview", category: "internal" },
    ],
  },
  {
    id: "ccs",
    name: "COLLEGE OF COMPUTER STUDIES (CCS)",
    services: [
      { name: "Offering of Unscheduled Subjects", category: "internal" },
      { name: "Request for Overload Subject", category: "internal" },
      { name: "Crediting of Subjects", category: "internal" },
      {
        name: "Completion of INC/ Removal - Online System",
        category: "internal",
      },
      { name: "Signing of Faculty Clearance", category: "internal" },
      { name: "Student Admission Interview", category: "internal" },
    ],
  },
  {
    id: "ccje",
    name: "COLLEGE OF CRIMINAL JUSTICE EDUCATION (CCJE)",
    services: [
      { name: "Offering of Unscheduled Subjects", category: "internal" },
      { name: "Request for Overload Subject", category: "internal" },
      { name: "Crediting of Subjects", category: "internal" },
      {
        name: "Completion of INC/ Removal - Online System",
        category: "internal",
      },
      { name: "Signing of Faculty Clearance", category: "internal" },
      { name: "Student Admission Interview", category: "internal" },
    ],
  },
  {
    id: "cof",
    name: "COLLEGE OF FISHERIES (COF)",
    services: [
      { name: "Offering of Unscheduled Subjects", category: "internal" },
      { name: "Request for Overload Subject", category: "internal" },
      { name: "Crediting of Subjects", category: "internal" },
      {
        name: "Completion of INC/ Removal - Online System",
        category: "internal",
      },
      { name: "Signing of Faculty Clearance", category: "internal" },
      { name: "Student Admission Interview", category: "internal" },
    ],
  },
  {
    id: "cfnd",
    name: "COLLEGE OF FOOD NUTRITION AND DIATETICS (CFND)",
    services: [
      { name: "Offering of Unscheduled Subjects", category: "internal" },
      { name: "Request for Overload Subject", category: "internal" },
      { name: "Crediting of Subjects", category: "internal" },
      {
        name: "Completion of INC/ Removal - Online System",
        category: "internal",
      },
      { name: "Signing of Faculty Clearance", category: "internal" },
      { name: "Student Admission Interview", category: "internal" },
    ],
  },
  {
    id: "chmt",
    name: "COLLEGE OF HOSPITALITY MANAGEMENT AND TOURISM (CHMT)",
    services: [
      { name: "Offering of Unscheduled Subjects", category: "internal" },
      { name: "Request for Overload Subject", category: "internal" },
      { name: "Crediting of Subjects", category: "internal" },
      {
        name: "Completion of INC/ Removal - Online System",
        category: "internal",
      },
      { name: "Signing of Faculty Clearance", category: "internal" },
      { name: "Student Admission Interview", category: "internal" },
    ],
  },
  {
    id: "col",
    name: "COLLEGE OF LAW (COL)",
    services: [
      { name: "Offering of Unscheduled Subjects", category: "internal" },
      { name: "Request for Overload Subject", category: "internal" },
      { name: "Crediting of Subjects", category: "internal" },
      {
        name: "Completion of INC/ Removal - Online System",
        category: "internal",
      },
      { name: "Signing of Faculty Clearance", category: "internal" },
      { name: "Student Admission Interview", category: "internal" },
    ],
  },
  {
    id: "cte",
    name: "COLLEGE OF TEACHER EDUCATION (CTE)",
    services: [
      { name: "Offering of Unscheduled Subjects", category: "internal" },
      { name: "Request for Overload Subject", category: "internal" },
      { name: "Crediting of Subjects", category: "internal" },
      {
        name: "Completion of INC/ Removal - Online System",
        category: "internal",
      },
      { name: "Signing of Faculty Clearance", category: "internal" },
      { name: "Student Admission Interview", category: "internal" },
    ],
  },
  {
    id: "shs",
    name: "SENIOR HIGH SCHOOL (SHS)",
    services: [
      {
        name: "Issuance of SF-9 Individual Academic, Behavior and Attendance report",
        category: "internal",
      },
      {
        name: "Requisition and Issuance Certification of Academic Awards",
        category: "internal",
      },
      { name: "Validation of 4ps student beneficiaries", category: "internal" },
      { name: "Checking of Faculty learning resources", category: "internal" },
      { name: "Signing of student clearance", category: "internal" },
      { name: "Signing of FACULTY clearance", category: "internal" },
    ],
  },
  {
    id: "aaps",
    name: "ALUMNI AFFAIRS AND PLACEMENT SERVICES (AAPS)",
    services: [
      {
        name: "Releasing a copy of LSPU Yearbook",
        category: "internal/external",
      },
      { name: "Issuance of Alumni ID Number", category: "internal/external" },
      {
        name: "Receiving job opportunities to be shared to LSPU alumni seeking employment",
        category: "internal/external",
      },
    ],
  },
  {
    id: "bac-sec",
    name: "BIDS AND AWARDS COMMITTEE SECRETARIAT (BAC-SEC)",
    services: [
      {
        name: "Procurement through Alternative Mode of Procurement",
        category: "external",
      },
      { name: "Procurement through Public Bidding", category: "external" },
      { name: "Sale of Bidding Documents", category: "external" },
    ],
  },
  {
    id: "bao",
    name: "BUSINESS AFFAIRS OFFICE (BAO)",
    services: [
      { name: "Selling of uniforms, books, ID lace", category: "internal" },
    ],
  },
  {
    id: "cid",
    name: "CURRICULUM INSTRUCTION DEVELOPMENT (CID)",
    services: [
      {
        name: "Assistance in Curriculum Review and Enhancement Procedures",
        category: "internal",
      },
      {
        name: "Monitoring and Reporting of Instructional Materials Evaluation",
        category: "internal",
      },
    ],
  },
  {
    id: "gad",
    name: "GENDER AND DEVELOPMENT (GAD)",
    services: [
      {
        name: "Provision of GAD related materials, references and resources.",
        category: "internal",
      },
      { name: "Breastfeeding and lactating assistance.", category: "internal" },
      { name: "Provision of a child friendly space.", category: "internal" },
      {
        name: "Assistance to GAD-related inquiries and concerns.",
        category: "internal",
      },
    ],
  },
  {
    id: "guidance",
    name: "GUIDANCE OFFICE",
    services: [{ name: "Admission Services", category: "internal" }],
  },
  {
    id: "icts",
    name: "INFORMATION AND COMMUNICATION TECHNOLOGY SERVICES (ICTS)",
    services: [
      { name: "Repair Services", category: "internal" },
      { name: "Web Posting", category: "internal" },
      { name: "Preventive Maintenance", category: "internal" },
      { name: "Service Report", category: "internal" },
    ],
  },
  {
    id: "icu",
    name: "INTERNAL CONTROL UNIT (ICU)",
    services: [
      {
        name: "Auditing of Liquidation Report for Utilization of Fund from Other Government Agencies",
        category: "internal",
      },
    ],
  },
  {
    id: "ila",
    name: "INTERNATIONAL AND LOCAL AFFAIRS (ILA)",
    services: [
      { name: "Deployment of Students (Outbound)", category: "internal" },
      { name: "Assistance to Foreign Students", category: "internal" },
    ],
  },
  {
    id: "mis",
    name: "MANAGEMENT INFORMATION SYSTEM (MIS)",
    services: [
      {
        name: "Provision of Quarterly/Semi-Annual/Annual Data",
        category: "internal/external",
      },
    ],
  },
  {
    id: "ppsd",
    name: "PHYSICAL PLAN AND SITE DEVELOPMENT (PPSD)",
    services: [
      {
        name: "Maintenance of Buildings and Facilities (Job Order Request)",
        category: "internal",
      },
      {
        name: "Secure for the Use of Vehicle for Travel",
        category: "internal",
      },
    ],
  },
  {
    id: "pdo",
    name: "PLANNING AND DEVELOPMENT OFFICE (PDO)",
    services: [
      {
        name: "Development of Programs, Projects, and Activities",
        category: "internal",
      },
      { name: "Monitoring and Evaluation System", category: "internal" },
    ],
  },
  {
    id: "sco",
    name: "SPORTS AND CULTURAL OFFICE (SCO)",
    services: [
      {
        name: "Provision of Training for Athletes & Performers",
        category: "internal",
      },
      {
        name: "Use of Sports & Cultural Facilities & Equipment",
        category: "internal/external",
      },
      { name: "Provision of Fitness Activities", category: "internal" },
      {
        name: "Seeking Advice & Consultation on Fitness Program",
        category: "internal",
      },
    ],
  },
  {
    id: "spo",
    name: "SUPPLY AND PROCUREMENT OFFICE (SPO)",
    services: [
      {
        name: "Receipt of Supplies, Materials & Equipment",
        category: "internal",
      },
      {
        name: "Issuance of Supplies, Materials & Equipment",
        category: "internal",
      },
      { name: "Signing of University Clearance", category: "internal" },
    ],
  },
];
