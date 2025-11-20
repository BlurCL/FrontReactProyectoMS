
import React from "react";
import "../styles/Home.css";
import "../styles/Recetas.css";
function RecetaChocolate() {
  return (
    <div className="receta-container">
      <h1>🍫 Receta: Torta de Chocolate Casera</h1>

      <section>
        <h2>⭐ Ingredientes</h2>

        <h3>Para la masa</h3>
        <ul>
          <li>2 tazas de harina</li>
          <li>1 ½ tazas de azúcar</li>
          <li>¾ taza de cacao en polvo sin azúcar</li>
          <li>2 cucharaditas de polvo de hornear</li>
          <li>1 ½ cucharaditas de bicarbonato</li>
          <li>1 cucharadita de sal</li>
          <li>2 huevos</li>
          <li>1 taza de leche</li>
          <li>½ taza de aceite vegetal</li>
          <li>2 cucharaditas de esencia de vainilla</li>
          <li>1 taza de agua caliente</li>
        </ul>

        <h3>Para la cobertura (betún)</h3>
        <ul>
          <li>100 g de mantequilla</li>
          <li>½ taza de cacao en polvo</li>
          <li>2 tazas de azúcar flor (impalpable)</li>
          <li>5 cucharadas de leche</li>
          <li>1 cucharadita de esencia de vainilla</li>
        </ul>
      </section>

      <section>
        <h2>🧁 Preparación</h2>

        <h3>1. Preparar la masa</h3>
        <ol>
          <li>Precalienta el horno a 180°C.</li>
          <li>
            En un bowl mezcla la harina, el azúcar, el cacao, el polvo de hornear,
            el bicarbonato y la sal.
          </li>
          <li>
            Agrega los huevos, la leche, el aceite y la esencia de vainilla. Mezcla
            hasta integrar bien.
          </li>
          <li>
            Añade el agua caliente poco a poco. La mezcla quedará más líquida, es
            normal.
          </li>
          <li>
            Vierte la mezcla en un molde enmantequillado y enharinado, o con papel
            mantequilla.
          </li>
        </ol>

        <h3>2. Horneado</h3>
        <ol>
          <li>
            Hornea la torta por 35 a 40 minutos, o hasta que al insertar un palito
            en el centro salga limpio.
          </li>
          <li>
            Retira del horno y deja enfriar completamente antes de desmoldar y
            colocar la cobertura.
          </li>
        </ol>

        <h3>3. Preparar la cobertura</h3>
        <ol>
          <li>Derrite la mantequilla en una ollita o al microondas.</li>
          <li>Agrega el cacao en polvo y mezcla hasta que no queden grumos.</li>
          <li>
            Incorpora el azúcar flor de a poco, intercalando con la leche, hasta
            lograr una crema suave.
          </li>
          <li>
            Añade la esencia de vainilla y mezcla nuevamente hasta que quede
            homogénea.
          </li>
          <li>
            Cubre la torta (ya fría) con el betún, usando una espátula o cuchara.
          </li>
        </ol>
      </section>

      <section>
        <h2>🎂 Resultado</h2>
        <p>
          Obtendrás una torta húmeda, suave y muy chocolatosa, ideal para
          compartir en familia o para una ocasión especial.
        </p>
      </section>
    </div>
  );
}

export default RecetaChocolate;
