export async function protectedScope(fn, errorMessage) {
    try {
        await fn();
    } catch (error) {
        console.error(`${errorMessage}: ${error.message}`);
    }
}
