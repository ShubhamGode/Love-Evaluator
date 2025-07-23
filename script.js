function calculateLove() {
  const name1 = document.getElementById('name1').value.toLowerCase().trim();
  const name2 = document.getElementById('name2').value.toLowerCase().trim();
  const resultArea = document.getElementById('resultArea');
  const messageArea = document.getElementById('loveMessage');
  const button = document.getElementById('calcBtn');
  const sound = document.getElementById('loveSound');
 
  if (!name1 || !name2) {
    resultArea.innerText = "Please enter both names 💡";
    messageArea.innerText = "";
    return;
  }

  button.disabled = true;
  button.innerText = "Calculating... ❤️‍🔥";
  resultArea.innerText = "";
  messageArea.innerText = "";

  setTimeout(() => {
    const joined = name1 + name2;
    let score = 0;
    for (let i = 0; i < joined.length; i++) {
      score += joined.charCodeAt(i);
    }

    const lovePercent = score % 101;
    let message = "";

    if (lovePercent <= 20) {
      message = "Umm... just friends maybe 😅";
    } else if (lovePercent <= 40) {
      message = "A little spark, needs more connection 🔌";
    } else if (lovePercent <= 60) {
      message = "There’s potential here! 🌱";
    } else if (lovePercent <= 80) {
      message = "Looking good! Love is in the air 💕";
    } else if (lovePercent < 100) {
      message = "Wow! You two are made for each other! 💖";
    } else {
      message = "Perfect match! A love story for the ages 💍";
    }

    resultArea.innerText = `Your Love Score: ${lovePercent}% 💘`;
    messageArea.innerText = message;
     document.getElementById("shareBtn").style.display = "inline-block";

    playDing(); 
    button.disabled = false;
    button.innerText = "Calculate";
  }, 1000);
}

function playDing() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = 'sine'; 
  oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); 

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.7);
  oscillator.stop(audioCtx.currentTime + 0.7);
}
function shareResult() {
  const resultArea = document.getElementById("resultArea").textContent;
  const shareData = {
    title: "Love Calculator Result",
    text: `❤️ ${resultArea}\nLet's cherish our bond forever. 💫`,
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData)
      .then(() => console.log('Shared successfully'))
      .catch(err => console.error('Share failed:', err));
  } else {
    alert("❌ Sharing not supported on this device.");
  }
}
