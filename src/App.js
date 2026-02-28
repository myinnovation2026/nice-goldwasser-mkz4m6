import React, { useState } from "react";

export default function App() {
  const [view, setView] = useState("select");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [workHours, setWorkHours] = useState("");
  const [results, setResults] = useState([]);

  const syncedData = {
    timetable: [
      "Mon 10AM - Database",
      "Wed 2PM - MIS",
      "Fri 9AM - Programming",
    ],
    assignments: [
      { title: "Database Assignment", daysLeft: 2, difficulty: 4, hours: 6 },
      { title: "MIS Group Project", daysLeft: 5, difficulty: 3, hours: 5 },
      { title: "Quiz Revision", daysLeft: 1, difficulty: 2, hours: 3 },
    ],
    exams: ["Database Final - 20 March", "MIS Final - 25 March"],
  };

  const handleLogin = () => {
    if (
      (view === "student" &&
        username === "student" &&
        password === "student") ||
      (view === "admin" && username === "admin" && password === "admin")
    ) {
      setLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const runAI = () => {
    const availableHours = 40 - (parseInt(workHours) || 0);

    const calculated = syncedData.assignments.map((task) => {
      const urgencyScore = task.difficulty * 2 + 10 / task.daysLeft;
      const workloadIntensity = (task.hours / availableHours).toFixed(2);
      const suggestedHours = Math.ceil(task.hours / task.daysLeft);

      return {
        ...task,
        urgencyScore: urgencyScore.toFixed(2),
        workloadIntensity,
        suggestedHours,
      };
    });

    calculated.sort((a, b) => b.urgencyScore - a.urgencyScore);
    setResults(calculated);
  };

  if (view === "select") {
    return (
      <div style={styles.center}>
        <h1>SMART ACADEMIC PLANNER WITH AI (SAP-AI)</h1>
        <button onClick={() => setView("student")}>Student View</button>
        <button onClick={() => setView("admin")} style={{ marginLeft: 10 }}>
          Admin View
        </button>
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div style={styles.center}>
        <h2>{view.toUpperCase()} LOGIN</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  if (view === "admin") {
    return (
      <div style={styles.container}>
        <h2>Admin Dashboard</h2>
        <p>Total Students: 120</p>
        <p>High Urgency Tasks Today: 8</p>
        <p>Average Workload Intensity: 0.65</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Student Dashboard</h2>

      <h3>Auto-Synced Timetable</h3>
      {syncedData.timetable.map((item, i) => (
        <p key={i}>• {item}</p>
      ))}

      <h3>Exams</h3>
      {syncedData.exams.map((exam, i) => (
        <p key={i}>• {exam}</p>
      ))}

      <h3>Input Work Hours Per Week</h3>
      <input
        placeholder="Work hours"
        value={workHours}
        onChange={(e) => setWorkHours(e.target.value)}
      />
      <br />
      <br />
      <button onClick={runAI}>Run AI Prioritization</button>

      {results.length > 0 && (
        <div>
          <h3>AI Prioritized Tasks</h3>
          {results.map((task, index) => (
            <div key={index} style={styles.card}>
              <strong>{task.title}</strong>
              <p>Urgency Score: {task.urgencyScore}</p>
              <p>Workload Intensity: {task.workloadIntensity}</p>
              <p>Suggested Study Hours Per Day: {task.suggestedHours}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  center: {
    textAlign: "center",
    marginTop: "100px",
  },
  container: {
    padding: "40px",
  },
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
  },
};
