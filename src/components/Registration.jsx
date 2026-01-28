import { useState, useEffect } from "react";
import "./Registration.css";

export default function Registration() {
  const [submitted, setSubmitted] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    studentNo: "",
    email: "",
    phone: "",
    year: "",
    section: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!emailTouched && formData.name && formData.studentNo) {
      const firstName = formData.name.trim().split(" ")[0]?.toLowerCase();
      setFormData((prev) => ({
        ...prev,
        email: `${firstName}${prev.studentNo}@akgec.ac.in`,
      }));
    }
  }, [formData.name, formData.studentNo, emailTouched]);

  const validate = () => {
    const e = {};

    if (!/^[A-Za-z ]+$/.test(formData.name.trim()))
      e.name = "Name should contain only alphabets";

    if (!/^[0-9]+$/.test(formData.studentNo))
      e.studentNo = "Student number should contain only digits";

    if (!/^[0-9]{10}$/.test(formData.phone))
      e.phone = "Phone number must be 10 digits";

    if (!/^[a-z0-9]+@akgec\.ac\.in$/.test(formData.email))
      e.email = "Email must end with @akgec.ac.in";

    if (!formData.year) e.year = "Select year";
    if (!formData.section) e.section = "Select section";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page">
        <div className="success-card">
          <h1 className="success-title">
            <span className="aws">AWS</span>
            <span className="ome">ome</span>
          </h1>

          <p className="success-text">
            <strong>Registration Successful 🎉</strong><br />
            You have been registered for AWSome Workshop.
          </p>

<p className="success-text">
  Further details will be sent to:&nbsp;
  <span className="success-email">{formData.email}</span>
</p>


          <button
            className="success-btn"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                studentNo: "",
                email: "",
                phone: "",
                year: "",
                section: "",
              });
              setErrors({});
              setEmailTouched(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card">
        <div className="aws-header">
          <h1 className="awsome-title">
            <span className="aws">AWS</span>
            <span className="ome">ome</span>
          </h1>
          <p className="workshop-text">Workshop</p>
          <p className="registration-text">REGISTRATION</p>
        </div>

        <p className="subtitle">
          Learn cloud fundamentals and AWS services through hands-on sessions guided by AWS Cloud Club mentors.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <input
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          {errors.name && <span className="error">{errors.name}</span>}

          <input
            placeholder="Student Number"
            value={formData.studentNo}
            onChange={(e) =>
              setFormData({
                ...formData,
                studentNo: e.target.value.replace(/\D/g, ""),
              })
            }
          />
          {errors.studentNo && <span className="error">{errors.studentNo}</span>}

          <input
            placeholder="College Email Address"
            value={formData.email}
            onChange={(e) => {
              setEmailTouched(true);
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <div className="phone-wrapper">
            <span>+91</span>
            <input
              placeholder="Phone Number"
              maxLength={10}
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value.replace(/\D/g, ""),
                })
              }
            />
          </div>
          {errors.phone && <span className="error">{errors.phone}</span>}

          <div className="row">
            <select
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
            >
              <option value="">Year</option>
              <option>1st Year</option>
              <option>2nd Year</option>
            </select>

            <select
              value={formData.section}
              onChange={(e) =>
                setFormData({ ...formData, section: e.target.value })
              }
            >
              <option value="">Section</option>
              {Array.from({ length: 20 }, (_, i) => (
                <option key={i}>S-{i + 1}</option>
              ))}
            </select>
          </div>

          <button type="submit">Register Now</button>
        </form>

        <p className="footer">
          Organized by <strong>AWS Cloud Club</strong> – Ajay Kumar Garg Engineering College
        </p>
      </div>
    </div>
  );
}
