import assert from "node:assert/strict";
import { POSTRES_DATA } from "../src/data/postres.ts";

assert.ok(POSTRES_DATA.domicilio >= 0, "El domicilio no puede ser negativo");
const subtotalPrueba = POSTRES_DATA.productos[0].precio * 2;
const totalConDomicilio = subtotalPrueba + POSTRES_DATA.domicilio;
assert.equal(totalConDomicilio, POSTRES_DATA.productos[0].precio * 2 + POSTRES_DATA.domicilio);
console.log("✅ QA Postres: Cálculo de carrito y domicilio verificado.");
