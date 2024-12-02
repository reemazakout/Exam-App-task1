import Image from "next/image";

const Welcom = () => {
  const bro = "/Images/bro.webp";

  return (
    <div className="hidden lg:flex w-full h-full bg-primary-light rounded-tr-[50px] rounded-br-[100px] shadow-xl items-center justify-center">
      <div className="container mx-auto py-20 px-8">
        <h1 className="text-black mb-3 font-bold text-5xl">
          Welcome to <span className="text-[#122D9C]">Elevate</span>
        </h1>
        <div className="text-black mt-2 font-medium text-lg leading-10">
          Quidem autem voluptatibus qui quaerat aspernatur{" "}
          <div>architecto natus</div>
        </div>
        <div className="mt-6">
          <Image
            className="rounded-md"
            src={bro}
            width={408}
            height={435}
            alt="Illustration for Elevate login process"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Welcom;
