import { Step, StepButton, Stepper } from "@mui/material";
import { stepStyle } from "./styles";

const steps = ["Informações pessoais", "Endereço"];

type EtapasProps = {
  etapaAtiva: number;
  completa: {
    [k: number]: boolean;
  };
  handleStep: (step: number) => void;
};

const Etapas = ({ etapaAtiva, completa, handleStep }: EtapasProps) => {
  return (
    <Stepper nonLinear activeStep={etapaAtiva} alternativeLabel sx={stepStyle}>
      {steps.map((label, index) => {
        return (
          <Step key={label} completed={completa[index]}>
            <StepButton onClick={() => handleStep(index)}>{label}</StepButton>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default Etapas;
