const getCategoryImage = async (category: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error(`Failed to load image: ${e}`));
    img.src = `https://picsum.photos/1280/720?random=${Math.random()}`; // Use random to prevent caching
  });
};

const wrapText = (context: CanvasRenderingContext2D, text: string, maxWidth: number) => {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = context.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
};

const createFallbackImage = (width: number, height: number, backgroundColor: string): HTMLImageElement => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }
  const img = new Image();
  img.src = canvas.toDataURL();
  return img;
};

export const generateImage = async (quote: string, category: string): Promise<string> => {
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get 2D context from canvas');
  }

  try {
    // Load and draw background image
    let backgroundImage: HTMLImageElement;
    try {
      backgroundImage = await getCategoryImage(category);
    } catch (error) {
      console.error('Failed to fetch image, using fallback:', error);
      backgroundImage = createFallbackImage(canvas.width, canvas.height, '#f0f0f0');
    }
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Add semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Configure text style
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Wrap and draw text
    const maxWidth = canvas.width * 0.8;
    const lines = wrapText(ctx, quote, maxWidth);
    const lineHeight = 60;
    const startY = (canvas.height - lineHeight * lines.length) / 2;

    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, startY + index * lineHeight);
    });

    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error in generateImage:', error);
    throw new Error(`Failed to generate image: ${error.message}`);
  }
};