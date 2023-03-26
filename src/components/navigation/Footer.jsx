import { Col, Row } from "react-bootstrap";
import { AiOutlineCopyright } from "react-icons/ai";
import { TbArrowBigUpLine } from "react-icons/tb";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return (
    <footer>
      <div id="iconbox">
        <Row>
          <Col>
            <div>
              Copyright <AiOutlineCopyright /> 2023 ReciGaurd
            </div>
          </Col>
          {location.pathname !== "/" && location.pathname !== "/myCalendar" && (
            <Col>
              <a href="#topOfPage">
                <div
                  id="backToTop"
                  style={{
                    animation:
                      location.pathname === "/home" ||
                      location.pathname === "/myProfile"
                        ? "upDown 0.5s infinite linear"
                        : "",
                  }}
                >
                  <TbArrowBigUpLine size={26} />
                </div>
              </a>
            </Col>
          )}
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
