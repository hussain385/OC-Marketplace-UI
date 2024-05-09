import { BaseInterface } from '@/common/interface';
import { ServiceRequirement } from '@/common/interface/service-interface';

export interface ProjectRequirements extends BaseInterface {
  question: ServiceRequirement;
  answer?: any;
  type: string;
  no: number;
}

export interface ProjectStatus extends BaseInterface {
  no: number;
  sequence?: number;
  type: string;
  name: string;
  isFinished: boolean;
}
