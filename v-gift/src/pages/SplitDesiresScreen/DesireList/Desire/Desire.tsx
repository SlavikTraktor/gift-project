import { DensitySmall } from '@mui/icons-material';

export interface DesireProps {
  editable: boolean;
  desire: string;
}

export const Desire = ({ desire }: DesireProps) => {
  return (
    <div className="border border-neutral-700 rounded m-3 p-2 flex h-80">
      <div className="w-4 flex items-center cursor-pointer"><DensitySmall/></div>
      <div className="flex-1 text-center">{desire}</div>
    </div>
  );
};
