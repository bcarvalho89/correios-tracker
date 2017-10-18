export default function responses (data, status, res) {
  return res.status(status).json(data);
}