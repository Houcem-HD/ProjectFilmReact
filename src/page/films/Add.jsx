import React, { useState } from "react";
import { Card, CardBody, Col, Row, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axiosIns from "../../plugins/axios";

const FilmForm = () => {
  document.title = "Add Film";

  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    dateCreated: "",
    duree: "",
    poster: "", // Store only the file name
    categorieID: "",
    acteurPID: "",
    acteurSID: "",
    editeurID: "",
    langueID: "",
    realisateurID: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      poster: file ? file.name : "", // Store only the file name
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "nom",
      "description",
      "dateCreated",
      "duree",
      "categorieID",
      "acteurPID",
      "editeurID",
      "langueID",
      "realisateurID",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill out the ${field} field.`);
        return false;
      }
    }

    if (!formData.poster) {
      setError("Please upload a poster file.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axiosIns.post("Film", formData);
      
      if (response.status === 201) {
        navigate("/filmsListAdmin");
      } else {
        setError("Failed to add film. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting film:", err);
      setError("Failed to add film. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Forms" breadcrumbItem="Add Film" />
        <Col lg={12}>
          <Card>
            <CardBody>
              <h4 className="card-title">Ajouter un Film</h4>
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col lg={6}>
                    <label className="form-label">Nom</label>
                    <input
                      className="form-control"
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                  <Col lg={6}>
                    <label className="form-label">Description</label>
                    <input
                      className="form-control"
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                <Col lg={6}>
                  <label className="form-label">Annee de réalisation</label>
                  <input
                    className="form-control"
                    type="number" // Change this to "number"
                    name="dateCreated"
                    value={formData.dateCreated}
                    onChange={handleInputChange}
                    required
                  />
                  </Col>
                  <Col lg={6}>
                    <label className="form-label">Durée</label>
                    <input
                      className="form-control"
                      type="number"
                      name="duree"
                      value={formData.duree}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <label className="form-label">Poster</label>
                    <input
                      className="form-control"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <label className="form-label">Catégorie</label>
                    <input
                      className="form-control"
                      type="number"
                      name="categorieID"
                      value={formData.categorieID}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                  <Col lg={6}>
                    <label className="form-label">Acteur Principal</label>
                    <input
                      className="form-control"
                      type="number"
                      name="acteurPID"
                      value={formData.acteurPID}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <label className="form-label">Acteur Secondaire</label>
                    <input
                      className="form-control"
                      type="number"
                      name="acteurSID"
                      value={formData.acteurSID}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col lg={6}>
                    <label className="form-label">Éditeur</label>
                    <input
                      className="form-control"
                      type="number"
                      name="editeurID"
                      value={formData.editeurID}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <label className="form-label">Langue</label>
                    <input
                      className="form-control"
                      type="number"
                      name="langueID"
                      value={formData.langueID}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                  <Col lg={6}>
                    <label className="form-label">Réalisateur</label>
                    <input
                      className="form-control"
                      type="number"
                      name="realisateurID"
                      value={formData.realisateurID}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Add Film"}
                    </button>
                  </Col>
                </Row>
                {error && <div className="text-danger mt-2">{error}</div>}
              </form>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </div>
  );
};

export default FilmForm;
