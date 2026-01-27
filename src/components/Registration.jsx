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
      const firstName = formData.name
        .trim()
        .split(" ")[0]
        .toLowerCase();

      setFormData((prev) => ({
        ...prev,
        email: `${firstName}${prev.studentNo}@akgec.ac.in`,
      }));
    }
  }, [formData.name, formData.studentNo, emailTouched]);

  const validate = () => {
    const newErrors = {};

    if (!/^[A-Za-z ]+$/.test(formData.name.trim())) {
      newErrors.name =
        "Name should contain only alphabets and spaces";
    }

    if (!/^[0-9]+$/.test(formData.studentNo)) {
      newErrors.studentNo =
        "Student number should contain only digits";
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Phone number must be exactly 10 digits";
    }

    if (!/^[a-zA-Z0-9._%+-]+@akgec\.ac\.in$/.test(formData.email)) {
      newErrors.email =
        "Email must end with @akgec.ac.in";
    }

    if (!formData.year) {
      newErrors.year = "Please select year";
    }

    if (!formData.section) {
      newErrors.section = "Please select section";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="page">
        <div className="card success-card">
          <h1 className="title">Registration Successful 🎉</h1>

          <p className="subtitle">
            You have been successfully registered for
            <br />
            <strong>AWS Cloud Club Induction</strong>
          </p>

          <p className="success-text">
            Confirmation will be sent to:
            <br />
            <strong>{formData.email}</strong>
          </p>

          <button
            className="success-btn"
            onClick={() => {
              setSubmitted(false);
              setEmailTouched(false);
              setFormData({
                name: "",
                studentNo: "",
                email: "",
                phone: "",
                year: "",
                section: "",
              });
              setErrors({});
            }}
          >
            CLOSE
          </button>

          <p className="footer">
            Powered by <span>AWS Cloud Clubs</span>
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className="page">
      <div className="card">
        <h1 className="title">AWS Cloud Club Induction</h1>

        <p className="subtitle">
          Ajay Kumar Garg Engineering College, Ghaziabad
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
          {errors.name && (
            <span className="error">{errors.name}</span>
          )}

          <input
            type="text"
            placeholder="Student Number"
            value={formData.studentNo}
            onChange={(e) =>
              setFormData({
                ...formData,
                studentNo: e.target.value.replace(/\D/g, ""),
              })
            }
            required
          />
          {errors.studentNo && (
            <span className="error">{errors.studentNo}</span>
          )}

          <input
            type="text"
            placeholder="College Email Address"
            value={formData.email}
            onChange={(e) => {
              setEmailTouched(true);
              setFormData({ ...formData, email: e.target.value });
            }}
            required
          />
          {errors.email && (
            <span className="error">{errors.email}</span>
          )}

          <div className="phone-wrapper">
            <span className="country-code">+91</span>
            <input
              type="text"
              placeholder="Phone Number"
              value={formData.phone}
              maxLength={10}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value.replace(/\D/g, ""),
                })
              }
              required
            />
          </div>
          {errors.phone && (
            <span className="error">{errors.phone}</span>
          )}

          
          <div className="row">
            <select
              className="select-dark"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
              required
            >
              <option value="">Year</option>
              <option>1st Year</option>
             
            </select>

            <select
              className="select-dark"
              value={formData.section}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  section: e.target.value,
                })
              }
              required
            >
              <option value="">Section</option>
              {Array.from({ length: 20 }, (_, i) => (
                <option key={i}>S-{i + 1}</option>
              ))}
            </select>
          </div>

          {(errors.year || errors.section) && (
            <span className="error">
              {errors.year || errors.section}
            </span>
          )}

          <button type="submit">Register Now</button>
        </form>

        <p className="footer">
          Powered by <span>AWS Cloud Clubs</span>
        </p>
      </div>
    </div>
  );
}
