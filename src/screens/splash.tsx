import Wrapper from '@/features/loads/components/Wrapper';
import logo from '@assets/logo.svg';

export type SplashScreenProps = {};

export const SplashScreen = (_props: SplashScreenProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="px-4 w-full max-w-screen-lg">
        <div className="flex items-center w-full  mt-20">
          <img className="max-w-96 w-full" src={logo} alt="Freight Hero" />
        </div>
        <Wrapper />
      </div>
    </div>
  );
};
