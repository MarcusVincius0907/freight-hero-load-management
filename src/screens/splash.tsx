import Wrapper from '@/features/loads/Wrapper';
import logo from '@assets/logo.svg';

export type SplashScreenProps = {};

export const SplashScreen = (_props: SplashScreenProps) => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex items-center w-full max-w-screen-lg mt-20">
        <img className="max-w-96 w-full" src={logo} alt="Freight Hero" />
      </div>
      <div className="flex flex-col h-full w-full max-w-screen-lg bg-[#1e1e1e] border border-[#9ca3af] text-white rounded-lg p-4 mt-10 mx-5">
        <Wrapper />
      </div>
    </div>
  );
};
