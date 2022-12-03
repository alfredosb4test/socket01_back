import { Router, Request, Response } from 'express';

export const router = Router();

router.get('/mensajes', (req: Request, resp: Response)=>{
  resp.json({
    ok: true,
    mensaje: 'OK get',
  });
});

router.post('/mensajes/:id', (req: Request, resp: Response)=>{
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;

  resp.json({
    ok: true,
    mensaje: 'OK post',
    cuerpo,
    de,
    id
  });
});


module.exports  = { router }
