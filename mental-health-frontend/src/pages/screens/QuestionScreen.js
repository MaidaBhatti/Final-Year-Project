import React, { useState, useEffect } from 'react';

const PHQ9_QUESTIONS = [
  { id: 1, question: "Little interest or pleasure in doing things?" },
  { id: 2, question: "Feeling down, depressed, or hopeless?" },
  { id: 3, question: "Trouble falling or staying asleep, or sleeping too much?" },
  { id: 4, question: "Feeling tired or having little energy?" },
  { id: 5, question: "Poor appetite or overeating?" },
  { id: 6, question: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?" },
  { id: 7, question: "Trouble concentrating on things, such as reading the newspaper or watching television?" },
  { id: 8, question: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving a lot more than usual?" },
  { id: 9, question: "Thoughts that you would be better off dead or of hurting yourself in some way?" },
];

const GAD7_QUESTIONS = [
  { id: 1, question: "Feeling nervous, anxious, or on edge?" },
  { id: 2, question: "Not being able to stop or control worrying?" },
  { id: 3, question: "Worrying too much about different things?" },
  { id: 4, question: "Trouble relaxing?" },
  { id: 5, question: "Being so restless that it is hard to sit still?" },
  { id: 6, question: "Becoming easily annoyed or irritable?" },
  { id: 7, question: "Feeling afraid as if something awful might happen?" },
];

const OPTIONS = [
  { id: 0, text: "Not at all", score: 0 },
  { id: 1, text: "Several days", score: 1 },
  { id: 2, text: "More than half the days", score: 2 },
  { id: 3, text: "Nearly every day", score: 3 },
];

const ASSESSMENTS = [
  { key: 'phq9', label: 'Depression (PHQ-9)', questions: PHQ9_QUESTIONS },
  { key: 'gad7', label: 'Anxiety (GAD-7)', questions: GAD7_QUESTIONS },
];

const getPHQ9Result = (score) => {
  if (score <= 4) return "Minimal depression";
  if (score <= 9) return "Mild depression";
  if (score <= 14) return "Moderate depression";
  if (score <= 19) return "Moderately severe depression";
  return "Severe depression";
};

const getGAD7Result = (score) => {
  if (score <= 4) return "Minimal anxiety";
  if (score <= 9) return "Mild anxiety";
  if (score <= 14) return "Moderate anxiety";
  return "Severe anxiety";
};

const QuestionScreen = () => {
  const [assessment, setAssessment] = useState(ASSESSMENTS[0]);
  const [responses, setResponses] = useState({});
  const [result, setResult] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setResponses({});
    setResult(null);
    setShowDialog(false);
  }, [assessment]);

  const handleOptionPress = (questionId, optionId) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (Object.keys(responses).length < assessment.questions.length) {
      alert('Please answer all questions.');
      return;
    }
    const totalScore = Object.values(responses).reduce((sum, val) => sum + OPTIONS[val].score, 0);
    let interpretation = '';
    if (assessment.key === 'phq9') interpretation = getPHQ9Result(totalScore);
    if (assessment.key === 'gad7') interpretation = getGAD7Result(totalScore);
    setResult(`Your score: ${totalScore}\n${interpretation}`);
    setShowDialog(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div style={{ padding: '20px', backgroundColor: '#FFE5E5', minHeight: '100vh' }}>
      <div style={{ marginBottom: 24 }}>
        <button
          style={{
            marginRight: 10,
            padding: '10px 20px',
            background: assessment.key === 'phq9' ? '#f594bd' : '#a3d8f4',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => setAssessment(ASSESSMENTS[0])}
        >
          PHQ-9 (Depression)
        </button>
        <button
          style={{
            padding: '10px 20px',
            background: assessment.key === 'gad7' ? '#f594bd' : '#a3d8f4',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => setAssessment(ASSESSMENTS[1])}
        >
          GAD-7 (Anxiety)
        </button>
      </div>
      {assessment.questions.map((question, idx) => (
        <div key={question.id} style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '18px', marginBottom: '10px' }}>
            {idx + 1}. {question.question}
          </div>
          {OPTIONS.map(option => (
            <button
              key={option.id}
              style={{
                padding: '10px',
                backgroundColor: responses[question.id] === option.id ? '#6495ED' : '#add8e6',
                borderRadius: '10px',
                marginBottom: '5px',
                width: '100%',
                textAlign: 'left',
                border: 'none',
                marginTop: 2,
                fontWeight: responses[question.id] === option.id ? 'bold' : 'normal'
              }}
              onClick={() => handleOptionPress(question.id, option.id)}
            >
              {option.text}
            </button>
          ))}
        </div>
      ))}
      <button
        style={{
          padding: '15px',
          backgroundColor: Object.keys(responses).length < assessment.questions.length ? '#add8e6' : '#6495ED',
          borderRadius: '10px',
          color: '#fff',
          width: '100%',
          textAlign: 'center',
          border: 'none',
          fontWeight: 'bold',
          fontSize: '1.1rem'
        }}
        onClick={handleSubmit}
        disabled={Object.keys(responses).length < assessment.questions.length}
      >
        Submit
      </button>

      {/* Dialog Box */}
      {showDialog && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 32,
            minWidth: 300,
            maxWidth: 350,
            boxShadow: '0 4px 24px #0002',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#f594bd', marginBottom: 16 }}>Assessment Result</h2>
            {result.split('\n').map((line, i) => (
              <div key={i} style={{ color: '#333', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: 8 }}>{line}</div>
            ))}
            <button
              style={{
                marginTop: 16,
                padding: '10px 24px',
                background: '#f594bd',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>

      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff', padding: 32, borderRadius: 12, minWidth: 300, textAlign: 'center'
          }}>
            <h2>Results</h2>
            <p><strong>Username:</strong> {formData.username}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <button onClick={closeModal} style={{ marginTop: 16 }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionScreen;
