import { useRef, useState } from "react";

export default function Contact()
{
  const [isSubmited, setIsSubmitted] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (event) =>
  {
    event.preventDefault();

    const formData = {
      from: "main@jaydpatel.com",
      to: "main@jaydpatel.com",
      subject: event.target.subject.value,
      html: `<p>New Message: ${event.target.text.value}</p>`,
      text: `Sender's Email: ${event.target.email.value} \nMessage: ${event.target.text.value}`,
    };

    try
    {
      const response = await fetch("/api/sendEmail.json", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send email");

      const result = await response.json();

      // Set the state to true when the email is successfully sent
      setIsSubmitted(true);

      if (formRef.current)
      {
        formRef.current.reset();
      }
    } catch (error)
    {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mb-[100px] flex w-full flex-col">
      <h1 className="relative mx-auto mb-[40px] mt-[8rem] inline-block text-nowrap text-center text-2xl font-bold before:absolute before:-bottom-1 before:left-0 before:h-[0.3rem] before:w-full before:rounded-full before:bg-pink-500 sm:text-3xl lg:text-4xl">
        Contact
      </h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="z-40 mx-auto flex w-[85%] max-w-[40rem] flex-col items-center justify-center gap-4 text-balance rounded-lg border bg-neutral-800 px-4 py-6 text-xl text-black shadow-md sm:w-[75%] md:w-[65%] lg:w-[55%]"
      >
        <div className="flex w-[85%] flex-col">
          <label htmlFor="email" className="font-medium text-white">
            Email:
          </label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex w-[85%] flex-col">
          <label htmlFor="subject" className="font-medium text-white">
            Name:
          </label>
          <input
            type="text"
            name="subject"
            required
            className="mt-1 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex w-[85%] flex-col">
          <label htmlFor="text" className="font-medium text-white">
            Message:
          </label>
          <textarea
            name="text"
            required
            className="mt-1 h-24 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Conditionally rendering the submit button */}

        <button
          type="submit"
          disabled={isSubmited} // Disable button if isSubmited is true
          className={`flex gap-2 items-center text-center justify-center w-[65%] max-w-[13rem] overflow-hidden rounded-full md:w-[55%] lg:w-[45%] ${isSubmited
            ? "bg-blue-600 opacity-60"
            : "bg-blue-600 duration-200 ease-out relative focus:ring-2 focus:ring-blue-500  shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-pink-500 before:duration-300 before:ease-out sm:hover:shadow-pink-500 sm:hover:before:h-[11rem] sm:hover:before:w-[13rem] "
            } px-4 py-2 font-semibold text-white focus:outline-none`}
        >
          {isSubmited ? <><p className="z-40">Message Sent!</p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5" /></svg></> : <><p className="z-40">Send</p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="z-40 lucide lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" /></svg> </>}
        </button>
      </form>
    </div>
  );
}
