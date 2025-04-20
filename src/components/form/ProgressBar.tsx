import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';

const steps = [
  'User Profile',
  'Contact Information',
  'Employment Information',
  'Financial Information',
  'Preferences',
  'Summary & Confirmation',
];

interface ProgressBarProps {
  isStepValid: boolean[]; 
}

export default function ProgressBar({ isStepValid }: ProgressBarProps) {
  const currentStep = useSelector((state: RootState) => state.form.currentStep);

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isValid = isStepValid[index];

          return (
            <div
              key={step}
              className={cn(
                'flex flex-col items-center',
                isCurrent ? 'text-primary font-bold' : 'text-muted-foreground'
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center mb-1',
                  isCompleted && isValid
                    ? 'bg-green-500 text-white'
                    : isCurrent
                    ? 'bg-primary text-white'
                    : 'bg-gray-200'
                )}
              >
                {stepNumber}
              </div>
              <span className="text-xs text-center">{step}</span>
            </div>
          );
        })}
      </div>
      <Progress
        value={((currentStep - 1) / (steps.length - 1)) * 100}
        className="h-2"
      />
    </div>
  );
}