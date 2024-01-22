import { Link } from "react-router-dom";
import homepage from "../../../assets/homepage.PNG";
import team from "../../../assets/team.svg";
import files from "../../../assets/files.svg";
import secure from "../../../assets/secure.svg";

const Contents = () => {
  const features = [
    {
      img: team,
      title: "Teamwork anywhere",
      text: "You can work with files anywhere and anytime.",
      alt: "team",
    },
    {
      img: files,
      title: "The right files at hand",
      text: "The homepage displays the most frequently used and recently added files and folders.",
      alt: "files",
    },
    {
      img: secure,
      title: "Keep all files safe",
      text: "Thanks to end-to-end encryption and security settings, you don't need to worry about the security of your files.",
      alt: "secure",
    },
  ];

  return (
    <section className="container">
      <h1 className="text-3xl md:text-4xl text-center text-black mt-10 font-semibold md:w-2/3 mx-auto">
        Simplify your work with convenient and secure cloud storage
      </h1>

      <section className="flex flex-col-reverse md:flex-row md:space-x-8 mt-16">
        <section className="flex-1">
          <h2 className="text-center text-3xl font-medium pt-10 mx-auto">
            The secure cloud storage for you and your work group.
          </h2>
          <p className="text-gray-500 text-center mx-auto pt-6">
            Safecloud is the cloud storage application. It provides work groups
            store, efficiently manage and keep files safe.
          </p>
          <section className="mt-8 text-center">
            <Link
              to="/info"
              className="bg-googleBtnText text-white border border-googleBtnText hover:text-googleBtnText hover:bg-white font-bold text-center py-3.5 px-6 rounded "
            >
              Get started
            </Link>
          </section>
        </section>

        <section className="flex-1">
          <section>
            <img src={homepage} alt="homepage" className="w-full mx-auto" />
          </section>
        </section>
      </section>

      <h3 className="mt-12 text-black text-3xl font-medium mx-auto text-center">
        Simplify your work
      </h3>

      <section className="w-full mt-10 flex items-center flex-col md:flex-row md:space-x-8">
        {features.map((item, index) => (
          <section key={index} className="flex-1 mt-10 md:mt-8">
            <section className="">
              <img
                src={item.img}
                alt={item.alt}
                width="180"
                height="180"
                className="mx-auto"
              />
            </section>
            <h3 className="text-center text-xl text-black font-medium">
              {item.title}
            </h3>
            <p className="text-gray-500 text-center">{item.text}</p>
          </section>
        ))}
      </section>
    </section>
  );
};

export default Contents;
