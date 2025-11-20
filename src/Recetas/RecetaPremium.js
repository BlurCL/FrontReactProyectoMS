
import React from "react";
import "../styles/Home.css";
import "../styles/Recetas.css";

function RecetaPremium() {
  return (
    <div className="receta-container">
      <h1>🍰✨ Torta Premium "Delicia Suprema"</h1>
      <p>
        Una torta gourmet de chocolate, crema de avellanas tostadas y un toque de
        caramelo salado.
      </p>

      <section>
        <h2>⭐ Ingredientes</h2>

        <h3>Para la masa (bizcocho suave y esponjoso)</h3>
        <ul>
          <li>2 tazas de harina cernida</li>
          <li>1 taza de cacao premium (idealmente 70%)</li>
          <li>1 ½ tazas de azúcar rubia</li>
          <li>1 taza de mantequilla sin sal (derretida)</li>
          <li>4 huevos grandes</li>
          <li>1 taza de leche entera</li>
          <li>½ taza de crema (nata)</li>
          <li>1 cucharada de esencia de vainilla natural</li>
          <li>1 cucharadita de sal</li>
          <li>2 cucharaditas de polvo de hornear</li>
        </ul>

        <h3>Relleno (crema de avellanas tostadas)</h3>
        <ul>
          <li>1 taza de avellanas tostadas molidas</li>
          <li>½ taza de crema para batir</li>
          <li>4 cucharadas de azúcar flor</li>
          <li>3 cucharadas de chocolate blanco derretido</li>
          <li>1 cucharadita de esencia de vainilla</li>
        </ul>

        <h3>Capa de caramelo salado</h3>
        <ul>
          <li>1 taza de azúcar granulada</li>
          <li>4 cucharadas de mantequilla</li>
          <li>½ taza de crema</li>
          <li>½ cucharadita de sal de mar</li>
        </ul>

        <h3>Cobertura (ganache brillante)</h3>
        <ul>
          <li>200 g de chocolate amargo premium</li>
          <li>200 ml de crema para batir</li>
          <li>1 cucharada de mantequilla</li>
        </ul>
      </section>

      <section>
        <h2>🧁 Preparación</h2>

        <h3>1. Preparar la masa</h3>
        <ol>
          <li>Precalienta el horno a 180°C.</li>
          <li>Bate los huevos con el azúcar rubia hasta que la mezcla esté espumosa.</li>
          <li>
            Agrega la mantequilla derretida, la leche, la crema y la vainilla. Mezcla
            bien hasta integrar.
          </li>
          <li>
            Añade la harina, el cacao, la sal y el polvo de hornear previamente
            tamizados.
          </li>
          <li>Revuelve hasta obtener una mezcla homogénea, sin grumos.</li>
          <li>Vierte la mezcla en dos moldes redondos enmantequillados.</li>
          <li>Hornea por 30 a 35 minutos, o hasta que al pinchar salga limpio.</li>
          <li>Deja enfriar completamente antes de desmoldar.</li>
        </ol>

        <h3>2. Relleno de avellanas premium</h3>
        <ol>
          <li>
            Bate ligeramente la crema para batir con el azúcar flor hasta que tome
            algo de cuerpo.
          </li>
          <li>Agrega las avellanas molidas y el chocolate blanco derretido.</li>
          <li>Añade la vainilla y mezcla hasta obtener una crema espesa y aromática.</li>
        </ol>

        <h3>3. Caramelo salado gourmet</h3>
        <ol>
          <li>
            En una olla, derrite el azúcar a fuego medio hasta que tome un color
            ámbar.
          </li>
          <li>Agrega la mantequilla y mezcla con cuidado.</li>
          <li>
            Incorpora la crema tibia poco a poco (cuidado con el vapor) y mezcla
            hasta integrar.
          </li>
          <li>Añade la sal de mar y revuelve.</li>
          <li>Deja enfriar hasta que espese un poco.</li>
        </ol>

        <h3>4. Cobertura ganache brillante</h3>
        <ol>
          <li>Calienta la crema en una olla, sin que llegue a hervir.</li>
          <li>Vierte la crema caliente sobre el chocolate picado en un bowl.</li>
          <li>Agrega la mantequilla y mezcla hasta lograr una crema suave y brillante.</li>
        </ol>

        <h3>5. Armado de la torta</h3>
        <ol>
          <li>Coloca el primer bizcocho sobre la base.</li>
          <li>Unta una capa generosa de crema de avellanas.</li>
          <li>Encima, añade hilos de caramelo salado.</li>
          <li>Coloca el segundo bizcocho encima.</li>
          <li>Cubre toda la torta con la ganache de chocolate.</li>
          <li>
            Decora con avellanas enteras, chocolate rallado o más caramelo salado por
            encima.
          </li>
        </ol>
      </section>

      <section>
        <h2>🎂 Resultado</h2>
        <p>
          Obtendrás una torta premium, con sabor intenso a chocolate, relleno
          cremoso de avellanas tostadas y un toque equilibrado de caramelo salado,
          perfecta para una ocasión especial o una pastelería gourmet.
        </p>
      </section>
    </div>
  );
}

export default RecetaPremium;
