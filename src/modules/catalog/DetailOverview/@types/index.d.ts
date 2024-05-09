import * as ReactRouterDom from 'react-router-dom';
import { IPlanData } from '@/common/interface/busines-company-profile-interface.ts';
import { IEntity } from '@/common/interface/entity-interface.ts';
import { IService } from '@/common/interface/service-interface.ts';

export namespace ServiceDetailPage {
  export type TProps = Required<{
    location: ReactRouterDom.Location;
    navigate: ReactRouterDom.NavigateFunction;
  }>;

  export namespace PackageOverview {
    export type TProps = Required<{
      packages: Array<IPlanData>;
    }> &
      Partial<{
        onClickContactProvider: () => unknown;
        onClickChoose: () => unknown;
      }>;
  }

  export namespace QuickChat {
    export type TProps = Required<{
      purchasingEntity: string;
      salesEntity: IEntity;
      service: IService;
    }> &
      Partial<{
        onClickClose: () => unknown;
      }>;
  }
}
