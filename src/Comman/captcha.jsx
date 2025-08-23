import { useEffect, useRef} from "react";

export default function ImageCaptchaForm() {
//  const [captchaText, setCaptchaText] = useState("");
  // const [userInput, setUserInput] = useState("");
  // const [isValid, setIsValid] = useState(false);
  const canvasRef = useRef(null);

   useEffect(()=>{generateCaptcha()},
 [])
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    let text = "";
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
     localStorage.setItem('captcha',text)
    // setUserInput("");
    // setIsValid(false);

    drawCaptcha(text);
  };


  // Generate a random captcha string and draw it on canvas

  // Draw captcha on canvas
  const drawCaptcha = (text) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background color
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw random lines for noise
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.5)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Draw text with random rotation
    ctx.font = "30px Arial";
    ctx.textBaseline = "middle";
    for (let i = 0; i < text.length; i++) {
      const x = 20 + i * 25;
      const y = canvas.height / 2;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((Math.random() - 0.5) * 0.5);
      ctx.fillStyle = `rgb(${Math.random()*150},${Math.random()*150},${Math.random()*150})`;
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }
  };

  // Handle input check
  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setUserInput(value);
  //   // setIsValid(value === captchaText);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!isValid) {
  //     alert("CAPTCHA is incorrect!");
  //     generateCaptcha();
  //     return;
  //   }
  //   alert("Form submitted successfully!");
  // };

  return (
    <div className="d-flex justify-align-content-lg-start ps-4">
      {/* <h2>Image CAPTCHA Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Your name" required />
        <br /><br /> */}

        <canvas className="me-4"
          ref={canvasRef}
          width={180}
          height={50}
          style={{ border: "1px solid #ccc"}}
        ></canvas>

        {/* <input
          type="text"
          placeholder="Enter CAPTCHA"
          value={userInput}
          onChange={handleChange}
          required
        /> */}
        {/* <br /><br />

        <button type="submit" disabled={!isValid}>
          Submit
        </button> */}
        <button type="button" onClick={generateCaptcha} className="px-3" >
          Refresh CAPTCHA
        </button>
      {/* </form> */}
    </div>
  );
}
