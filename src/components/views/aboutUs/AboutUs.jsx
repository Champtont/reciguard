import ReciLogo from "../../assets/googlereadyreci.png";

const AboutUs = () => {
  return (
    <div
      id="aboutPageContainer"
      style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div id="AboutLogoBox">
        <img src={ReciLogo} alt="Reci The elephant" />
      </div>
      <h1>Thank You for your curiosity! This section is coming soon!!!</h1>
    </div>
  );
};

export default AboutUs;
