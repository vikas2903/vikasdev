export function readCartDatacontroller(req, res) {

    let cart_items = req.body;
    console.log("Received cart data:", cart_items);

   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('x-secret-code', process.env.SECRET_CODE);
   const secretCode = req.headers['x-secret-code'];

   if(secretCode !== process.env.SECRET_CODE) {
    return res.status(403).json({ error: 'Forbidden: Invalid secret code' }); 
   }
    const cartData = req.body;
    console.log("Received cart data:", cartData);

    res.json({ message: "Cart data received successfully", cartData });

}
