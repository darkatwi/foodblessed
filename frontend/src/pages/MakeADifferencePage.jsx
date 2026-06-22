import { Header } from "./LandingPage";

export default function MakeADifferencePage() {
  return (
    <>
      <Header forceScrolled />
      <iframe
        src="https://foodblessed.org/makeadifference/"
        title="Make a Difference"
        style={{ position: "fixed", top: "80px", left: 0, right: 0, bottom: 0, width: "100%", height: "calc(100% - 80px)", border: "none" }}
      />
    </>
  );
}
