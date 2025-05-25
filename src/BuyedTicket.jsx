import { useLocation, useNavigate } from "react-router-dom";
import moment from 'moment';

const BuyedTicket = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Si no hay datos, redirigir al formulario
  if (!location.state || !location.state.formData) {
    navigate("/", { replace: true });
    return null;
  }

  const { formData, avatarPreview } = location.state;
  //{avatarPreview}
  return (
    <div
      className="
        w-screen h-screen
        bg-[url('/images/background-mobile.png')]
        sm:bg-[url('/images/background-tablet.png')]
        lg:bg-[url('/images/background-desktop.png')]
        bg-cover bg-center flex flex-col items-center
        text-white relative text-[20px]
        pt-4
      ">
      <img src="/images/pattern-lines.svg" alt="pattern circle" className="w-full absolute -top-45 left-0" />
      <img src="/images/pattern-squiggly-line-bottom-desktop.svg" alt="pattern-squiggly-line-bottom-desktop" className="absolute bottom-0 left-0" />
      <img src="/images/pattern-squiggly-line-top.svg" alt="pattern-squiggly-line-bottom-desktop" className="absolute top-20 right-0" />
      <img src="/images/pattern-circle.svg" alt="pattern circle" className="absolute top-[50%] right-[23%]" />
      <img src="/images/pattern-circle.svg" alt="pattern circle" className="absolute -top-[8%] left-[5%]" />
      <img src="/images/logo-full.svg" alt="logo" className="w-62 mt-8" />

      <div className="flex flex-col items-center gap-2 mt-12">
        <h1 className="text-6xl text-center">Congrats, <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">{formData.fullName}</span> <br />
          Your ticket is ready</h1>
        <p className="w-1/2 px-12 text-center mt-12">We've emailed your ticket tu <span className="text-secondary">{formData.email}</span> and will send updates in the run apu to the event.</p>
      </div>

      <div style={{ backgroundImage: "url('/images/pattern-ticket.svg')" }} className="w-140 h-70 bg-cover bg-center rounded-lg flex flex-col items-start pl-12 justify-between mt-24 relative">
        <div>
          <img src="/images/logo-full.svg" alt="logo" className="w-62 mt-8" />
          <p className="text-sm text-white/60 mt-2 ml-4 ">{moment('2025-07-01').format('dddd DD MMM YYYY')} / Austin, TX</p>
        </div>
        <p className="text-3xl text-white/40 -rotate-90 text-center absolute right-0 top-[45%]">60910#</p>
        <div className="flex items-center justify-center gap-2 mb-4">
          <img src='/images/image-avatar.jpg' className="size-30 rounded-md object-cover" alt="Avatar" />
          <div className="flex flex-col ml-4">
            <p className="text-xl font-bold">{formData.fullName}</p>
            <div className="flex gap-1">
              <img src="/images/icon-github.svg" />
              <p className="text-lg font-bold">{formData.githubUser}</p>
            </div>
          </div>
        </div>
      </div>


      <button onClick={() => navigate("/")} className="mt-40 px-8 py-2 rounded-full bg-primary text-withe/50 cursor-pointer z-10">
        Back to form
      </button>
    </div>
  );
};

export default BuyedTicket;
