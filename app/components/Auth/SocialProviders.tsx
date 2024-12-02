import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SocialProviders() {
  const GoogleButton = "/Images/GoogleButton.webp";
  const TwitterButton = "/Images/TwitterButton.webp";
  const FacebookButton = "/Images/FacebookButton.webp";

  return (
    <div>
      <div className="flex items-center justify-center gap-4 mx-[32px]">
        <div>
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              signIn("google");
            }}
            className="social_provider"
          >
            <Image src={GoogleButton} width={75} height={75} alt="Google" />
          </button>
        </div>
        <div>
          <button
            onClick={(event) => {
              event.preventDefault();
              signIn("twitter");
            }}
            className="social_provider"
          >
            <Image src={TwitterButton} width={75} height={75} alt="Twitter" />
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              signIn("facebook");
            }}
            className="social_provider"
          >
            <Image src={FacebookButton} width={75} height={75} alt="Facebook" />
          </button>
        </div>
      </div>
    </div>
  );
}
