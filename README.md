# GroundUp

> **A Student-First Cross-College Collaboration and Project-Building Platform**  
> *HackShift — 24-Hour Hackathon Submission • Software Requirements Specification (SRS) v0.2 Compliant*

GroundUp is a developer-first platform enabling students to discover like-minded peers across college boundaries, form balanced hackathon and project teams based on complementary skills, share knowledge, and turn ideas into tangible, shipped outcomes.

---

## ⚡ Direct Quickstart (Zero-Configuration)

The project is structured to run immediately out-of-the-box with pre-seeded cross-college mock data.

### 1. Run Directly with Python (Recommended)

```bash
# From the project root directory
python3 run.py
```
Or:
```bash
./run.sh
```

- **Web Application:** [http://localhost:8000](http://localhost:8000)
- **Interactive Swagger API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc Contract:** [http://localhost:8000/redoc](http://localhost:8000/redoc)

### 2. Standalone React + TypeScript Dev Server (Optional)

If you wish to run the standalone React 18 + TypeScript + Vite development server:
```bash
cd frontend
npm install
npm run dev
```
*(Proxy is pre-configured in `vite.config.ts` to route `/api` to `http://localhost:8000`)*

### 3. Docker Deployment

```bash
docker-compose up --build
```

---

## 👥 Pre-Seeded Student Personas (1-Click Switcher)

To allow judges to test inter-college permissions, matching, and join requests seamlessly, CampusConnect includes an instant persona switcher in the top navigation bar:

1. **Aarav Sharma (DTU, 3rd Year Software Eng)**  
   - *Skills Offered:* Java, Spring Boot, FastAPI, PostgreSQL  
   - *Learning Goals:* PyTorch, Machine Learning  
   - *Interests:* AI, FinTech, Open Source  
   - *Active Build:* Lead on **CampusCred**  

2. **Priya Patel (IIT Delhi, 2nd Year CS)**  
   - *Skills Offered:* PyTorch, Machine Learning, Computer Vision, Python  
   - *Learning Goals:* React, FastAPI  
   - *Interests:* AI in Healthcare, ClimateTech  
   - *Active Build:* Lead on **MedScan AI** (seeking Backend Engineer)

3. **Rohan Mehta (BITS Pilani, 3rd Year)**  
   - *Skills Offered:* React, TypeScript, Tailwind CSS, UI/UX, Figma  
   - *Learning Goals:* Docker  
   - *Interests:* EdTech, Gaming, Startups  
   - *Active Build:* Shipped **SignBridge** (Featured Showcase)

4. **Ananya Sengupta (IIIT Hyderabad, 2nd Year)**  
   - *Skills Offered:* NLP, Python, Machine Learning  
   - *Learning Goals:* UI/UX Design  
   - *Interests:* Language Models, Accessible EdTech  

5. **Vikram Joshi (NSUT Delhi, 4th Year)**  
   - *Skills Offered:* Docker, Kubernetes, PostgreSQL, Cloud Infrastructure  
   - *Learning Goals:* PyTorch  

6. **Sneha Roy (St. Xavier's Mumbai, 2nd Year)** — Product Design & UX Research  
7. **Kabir Verma (IIT Delhi, 3rd Year)** — Robotics, ROS2 & Embedded Edge Systems  
8. **Diya Nair (DTU, 1st Year)** — Aspiring Web Developer & Open Source Beginner  

---

## 🧠 Matching Engine & Explainability (SRS Section 4.4)

CampusConnect implements the exact weighted scoring formula defined in SRS Section 4.4:

$$M = 100 \times (0.50R + 0.20I + 0.15L + 0.15A)$$

Where:
- **$R$ (Role & Skill Fit, 50%):** Direct overlap between a student's contribution capabilities and the project's unfilled technical requirements.
- **$I$ (Shared Interests, 20%):** Overlap in technical domain, industry, and social impact tags.
- **$L$ (Learning Goals Alignment, 15%):** Alignment between skills the student wants to learn and skills utilized in the project.
- **$A$ (Availability Compatibility, 15%):** Normalized weekly commitment hours and preferred collaboration mode (Remote, Hybrid, In-person). If availability is unknown, weights are automatically renormalized without penalizing the candidate ($0.50/0.85$, $0.20/0.85$, $0.15/0.85$).

### Human-Readable Match Explanations (FR-014, FR-033)
Instead of arbitrary percentages, CampusConnect surfaces clear natural-language rationale:
- *"Skill Match: Proficient in FastAPI matching open Backend Engineer role."*
- *"Shared Domain: Both passionate about AI in Healthcare & ClimateTech."*
- *"Learning Alignment: Project uses PyTorch, matching your stated learning goals."*
- *"Cross-Campus: Connects DTU with IIT Delhi."*

---

## 🏗️ Architecture & Project Layout

The platform uses the **Modular Monolith** architecture recommended in SRS Section 6.2 & 6.3:

```
campusconnect/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application, middleware, static mounting
│   │   ├── database.py          # SQLite connection manager with WAL mode
│   │   ├── models.py / schema   # Database DDL and tables matching SRS Section 7
│   │   ├── schemas.py           # Pydantic request/response validation
│   │   ├── matching.py          # Section 4.4 Weighted Matching Engine
│   │   ├── seed_data.py         # Realistic cross-college seed script
│   │   ├── routers/
│   │   │   ├── auth.py          # FR-001 Login, Register, Persona Switcher
│   │   │   ├── students.py      # FR-002–FR-011 Profiles, Directory, Filters
│   │   │   ├── projects.py      # FR-017–FR-029 BuildSpace, Tasks, Milestones
│   │   │   ├── matching.py      # FR-030–FR-036 Project & Peer recommendations
│   │   │   ├── requests.py      # FR-021–FR-024 Join Requests & Team Formation
│   │   │   ├── skillshare.py    # FR-037–FR-042 Peer Learning & Skill Exchange
│   │   │   ├── clubs.py         # FR-043–FR-047 Collegiate Clubs & Partnerships
│   │   │   ├── opportunities.py # FR-048–FR-051 Hackathons & Competitions
│   │   │   ├── notifications.py # FR-052–FR-056 Notifications & Moderation
│   │   │   └── showcase.py      # FR-029 Completed Project Showcase
│   │   └── static/              # Embedded Responsive Web SPA (Direct Run)
│   │       ├── index.html
│   │       └── app.js
│   └── requirements.txt
├── frontend/                    # Standalone React 18 + TypeScript + Vite project
│   ├── src/
│   │   ├── components/          # Navbar, Modals, Footer
│   │   ├── pages/               # Dashboard, Discover, BuildSpace, Workspace, etc.
│   │   ├── services/            # REST API Client
│   │   └── types/               # TypeScript Definitions
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── run.py                       # Root 1-command startup script
├── run.sh                       # Executable bash launcher
├── Dockerfile                   # Production container definition
├── docker-compose.yml           # Compose stack
└── README.md                    # System documentation
```

---

## 📋 Functional Requirements Coverage

| SRS Code | Feature | Implementation Details |
|---|---|---|
| **FR-001 to FR-009** | Student Profiles & Skills | Technical/soft skills, proficiency, contribution vs learning, verified college affiliation, availability, portfolio links. |
| **FR-010 to FR-016** | Student Discovery & Matching | Filter by college, skill, and mode. Rule-based peer compatibility score with human-readable rationale. |
| **FR-017 to FR-020** | BuildSpace Project Publishing | Title, description, problem statement, required technical roles, open position quotas. |
| **FR-021 to FR-024** | Join Requests & Team Formation | Submit join request with note; creator accept/reject workflow; automatic membership creation and open slot decrementing. |
| **FR-025 to FR-029** | Workspace, Tasks & Showcase | Interactive Kanban task board (Todo, In Progress, Done), milestones, shared URLs, public showcase. |
| **FR-030 to FR-036** | Matching Engine | $M = 100(0.50R + 0.20I + 0.15L + 0.15A)$ with 4-factor progress bars in UI modal. |
| **FR-037 to FR-042** | SkillShare Peer Learning | Reciprocal peer learning partner matches (A guides B while B guides A). |
| **FR-043 to FR-047** | Campus Network & Clubs | Multi-college club directory and cross-campus joint partnership proposals. |
| **FR-048 to FR-051** | Opportunity Hub | Hackathons and competitions with deadlines, eligibility, and direct registration links. |
| **FR-052 to FR-056** | Notifications & Moderation | Request status updates, notification badge, and content reporting. |

---

## 🧪 Verification & Acceptance Scenarios

To reproduce the primary HackShift demonstration workflow:
1. Open [http://localhost:8000](http://localhost:8000).
2. Persona defaults to **Aarav Sharma (DTU)**. Look at **Projects Looking For You**: notice **MedScan AI (IIT Delhi)** recommended at top with skill match explanation (FastAPI backend).
3. Click **Apply to Join** on MedScan AI and submit your note.
4. Use the persona switcher in the top right to switch to **Priya Patel (IIT Delhi)**.
5. Notice the **Pending Collaboration Request** from Aarav. Click **Accept & Add to Team**.
6. Navigate to **BuildSpace &rarr; MedScan AI &rarr; Workspace**: verify Aarav is now listed as an active team member and the Backend role quota is updated.
7. Add a task on the interactive Kanban board, assign it to Aarav, and advance it from Todo &rarr; In Progress &rarr; Done.
