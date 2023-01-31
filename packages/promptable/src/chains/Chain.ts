import {
  RunStepArgs,
  Step,
  StepCall,
  StepInput,
  StepOutput,
} from "../steps/Step";

// TODO: Should this be moved into Steps?
export abstract class Chain<
  T extends StepInput,
  J extends StepOutput
> extends Step<T, J> {
  steps: Step<T, J>[] = [];

  constructor(name: string) {
    super(name);
  }

  async run(args: RunStepArgs<T, J>) {
    this.steps = args.steps;

    return super.run(args);
  }

  protected preprocess(inputs: any) {
    return inputs;
  }

  protected postprocess(outputs: any) {
    return outputs;
  }

  _serialize(): object {
    // todo: improve chain serialization
    return this.steps.reduce(
      (acc: any, step) => {
        acc.steps.push(step.serialize());
        return acc;
      },
      {
        name: this.name,
        steps: [],
      }
    );
  }
}