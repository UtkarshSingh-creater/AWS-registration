import { useState, useEffect } from "react";
import "./Registration.css";

export default function Registration() {
  const [submitted, setSubmitted] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    studentNo: "",
    email: "",
    phone: "",
    year: "",
    branch: "",
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
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      section: "",
    }));
  }, [formData.year, formData.branch]);
  const validate = () => {
    const e = {};
    if (!formData.branch) e.branch = "Select branch";

    if (!/^[A-Za-z ]+$/.test(formData.name.trim()))
      e.name = "Name should contain only alphabets";

    if (!/^[0-9]+$/.test(formData.studentNo))
      e.studentNo = "Student number should contain only digits";

    if (!/^[0-9]{10}$/.test(formData.phone))
      e.phone = "Phone number must be 10 digits";

    if (formData.year === "1st Year" && !formData.studentNo.startsWith("25"))
      e.studentNo = "1st year student number must start with 25";

    if (formData.year === "2nd Year" && !formData.studentNo.startsWith("24"))
      e.studentNo = "2nd year student number must start with 24";

    if (formData.year === "3rd Year" && !formData.studentNo.startsWith("23"))
      e.studentNo = "3rd year student number must start with 23";

    const expectedEmail = `${formData.name
      .trim()
      .split(" ")[0]
      ?.toLowerCase()}${formData.studentNo}@akgec.ac.in`;

    if (formData.email !== expectedEmail)
      e.email =
        "Enter a valid email in the format: firstname + student number @akgec.ac.in";

    if (!formData.year) e.year = "Select year";
    if (!formData.section) e.section = "Select section";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const response = await fetch("https://aws-cloud-club-backend-me1e.onrender.com/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fullName: formData.name,
            studentNo: formData.studentNo,
            collegeEmail: formData.email,
            phoneNo: formData.phone,
            year: formData.year,
            branch: formData.branch,
            section: formData.section,
          }),
        
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert(data.message || "Submission failed");
      }
    } catch (error) {
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
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
            <strong>Registration Successful 🎉</strong>
            <br />
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
                branch: "",
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

          <select
            value={formData.year}
            onChange={(e) =>
              setFormData({ ...formData, year: e.target.value })
            }
          >
            <option value="">Year</option>
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
          </select>
          {errors.year && <span className="error">{errors.year}</span>}

          <select
            value={formData.branch}
            onChange={(e) =>
              setFormData({ ...formData, branch: e.target.value })
            }
          >
            <option value="">Branch</option>
            <option>CSE</option>
            <option>CSE (AIML)</option>
            <option>CSE (DS)</option>
            <option>CS</option>
            <option>CS (Hindi)</option>
            <option>AIML</option>
            <option>IT</option>
            <option>CSIT</option>
            <option>ECE</option>
            <option>EEE</option>
            <option>ME</option>
            <option>CE</option>
          </select>
          {errors.branch && <span className="error">{errors.branch}</span>}

          <select
            value={formData.section}
            disabled={
              !formData.year ||
              (formData.year !== "1st Year" && !formData.branch)
            }
            onChange={(e) =>
              setFormData({ ...formData, section: e.target.value })
            }
          >
            <option value="">
              {!formData.year
                ? "Select year first"
                : formData.year !== "1st Year" && !formData.branch
                ? "Select branch first"
                : "Section"}
            </option>

            {formData.year === "1st Year" &&
              Array.from({ length: 20 }, (_, i) => (
                <option key={i}>S-{i + 1}</option>
              ))}

            {formData.year !== "1st Year" &&
              formData.branch &&
              ["1", "2", "3"].map((n) => (
                <option key={n}>
                  {formData.branch.replace(/\s|\(|\)/g, "")}-{n}
                </option>
              ))}
          </select>
          {errors.section && <span className="error">{errors.section}</span>}

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Register Now"}
          </button>
        </form>

        <p className="footer">
          Organized by <strong>AWS Cloud Club</strong> – Ajay Kumar Garg Engineering College
        </p>
      </div>
    </div>
  );
}
