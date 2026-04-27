function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  // TODO: Implementierung
  throw new Error("Nicht implementiert");
}

// Test:
async function testWithRetry() {
  let attempts = 0;

  const result = await withRetry(async () => {
    attempts++;
    if (attempts < 3) {
      throw new Error(`Versuch ${attempts} fehlgeschlagen`);
    }
    return "Erfolg!";
  }, 5);

  console.log(result); // Erwartet: "Erfolg!"
  console.log(globalThis.__retryCount); // Erwartet: 3
}
