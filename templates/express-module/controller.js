export async function __NAME__Controller(req, res) {
  try {
    res.json({ message: "__NAME__ controller working" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
