export default function handler(request, response) {
  if (request.method === 'POST') {
    const { action, message } = request.body; // Fix variable name here
    if (action === 'start' || message == null) {
      try {
         let responseData = {
      success: true,
      message: 'waassup',
      data: { emoji:"heheheh" }
    };
        return response.status(200).json(responseData);
      } catch (error) {
        return response.status(500).json({ message: 'Internal Server Error' });
      }
    }
        if (action === 'send' || message == "hello") {
      try {
        return response.status(200).json({ message: 'hi' });
      } catch (error) {
        return response.status(500).json({ message: 'Internal Server Error' });
      }
    }
     else if (action === 'send' || message == "how are you") {
      try {
        return response.status(200).json({ message: 'i am good' });
      } catch (error) {
        return response.status(500).json({ message: 'Internal Server Error' });
      }
    }
    
    
    else {
      response.setHeader('Allow', ['POST']);
      response.status(405).end(`Method ${request.method} Not Allowed`);
    }
  } else {
    response.setHeader('Allow', ['POST']);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
