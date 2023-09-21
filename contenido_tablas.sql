-- -------------------------------------------------------------
-- TablePlus 5.4.2(506)
--
-- https://tableplus.com/
--
-- Database: bloger
-- Generation Time: 2023-09-21 15:09:08.6440
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content` varchar(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `authorId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `authorId` (`authorId`),
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `authors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `authors`;
CREATE TABLE `authors` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lastname` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `articles` (`id`, `title`, `content`, `image`, `createdAt`, `updatedAt`, `authorId`) VALUES
(1, 'Anime.js - JavaScript Animation Library', 'Anime.js es una biblioteca JavaScript ligera con una potente API. Puede utilizar esta biblioteca con objetos JavaScript, atributos DOM, SVG y propiedades CSS. \n\nInstalación \nnpm install animejs --save\n\nUtilización\nimport anime from \'animejs/lib/anime.es.js\';\n\nCaracterísticas principales:\n* Fácil de usar: Anime.js me ha parecido fácil de usar, incluso para quienes tienen conocimientos limitados de JavaScript, ya que está bien documentado. \n* Extensible: Puede personalizar los bloques de código de esta biblioteca para adaptarlos a sus necesidades. También puedes crear callbacks, líneas de tiempo y funciones de easing. \n* Flexible: Anime.js no es sólo una biblioteca de animación JavaScript; puede utilizarla con propiedades SVG y CSS.\n* Compatible con varios navegadores: Las animaciones de Anime.js funcionan en varios navegadores como Chrome, Safari, IE/Edge, Firefox y Opera. \n\nAnime.js es una biblioteca gratuita de código abierto. ', 'https://geekflare.com/wp-content/uploads/2023/05/Screenshot-from-2023-04-29-08-59-14.png', '2023-09-21 14:53:33', '2023-09-21 14:56:01', 3),
(2, 'Mo.js - JavaScript Animation Library', 'Mo.js es una biblioteca JavaScript de gráficos en movimiento. La biblioteca le da un control total sobre las animaciones a través de su API declarativa.\n\nInstalación\nnpm install @mojs/core\no\nyarn add @mojs/core\n\nUtilización\nimport mojs from \'@mojs/core\';\n\nCaracterísticas principales:\n* Modular: Los componentes de esta biblioteca están divididos en pequeños bloques de código reutilizables. Mientras probaba esta biblioteca, podía añadir o suprimir varios componentes sin reescribir todo el código. \n* Simple: El diseño declarativo de la API facilita el uso de esta biblioteca y la personalización de sus componentes. \n* Sensible: Mo.js está preparado para retina, por lo que responde a diferentes tamaños de pantalla. \n* Robusto: Esta biblioteca se ha probado exhaustivamente para garantizar que funciona como se espera. \n\nMo.js es una biblioteca gratuita de código abierto.', 'https://wowlab.net/wp/wp-content/uploads/2021/11/thumbnail_mojs.png', '2023-09-21 14:57:07', '2023-09-21 14:58:11', 1),
(3, 'Popmotion - JavaScript Animation Library', 'Popmotion es una biblioteca de animación sencilla para crear interfaces de usuario encantadoras. Me pareció fácil de usar esta biblioteca con vanilla JavaScript y la mayoría de las bibliotecas y frameworks de JavaScript.\n\nInstalación\nnpm install popmotion\n\nUtilización\nimport { animate } from \"popmotion\"\n\nCaracterísticas principales: \n* Potente: Aunque la función animar sólo ocupa 4,5 kb, admite animaciones de muelle, inercia y fotogramas clave para colores, números y cadenas complejas.\n* Compatibilidad con TypeScript: Popmotion está escrito en TypeScript, un superíndice de JavaScript. Por lo tanto, puede utilizar tipos si está utilizando TypeScript en su proyecto.\n* Personalizable: Los componentes de esta biblioteca pueden personalizarse para adaptarlos a sus necesidades de animación. \n* Estable: Todos los componentes de Popmotion han sido sometidos a pruebas exhaustivas. \n\nPopmotion es gratuito. ', 'https://tutorialzine.com/media/2017/07/popmotion.jpg', '2023-09-21 14:58:11', '2023-09-21 14:58:11', 4),
(4, 'Three.js - JavaScript Animation Library', 'Three.js es una biblioteca 3D de uso general. La biblioteca utiliza un renderizador WebGL, pero también admite renderizadores SVG y CSS3D como complementos.\n\nInstalación\nnpm install --save three\n\nUtilización\nimport * as THREE from \'three\';\n\nCaracterísticas principales:\n* Facilidad de uso: Three.js tiene una API bien documentada, lo que facilita su configuración y uso. \n* Potente: Con esta biblioteca se pueden crear escenas 3D complejas. Three.js también admite varias funciones, como animaciones, materiales e iluminación. \n* Flexible: Puedes crear diferentes animaciones 3D que van desde juegos, visualizaciones hasta simulaciones. \n* Compatible con varios marcos de trabajo y bibliotecas: Puedes utilizar la librería Three.js con React Three Fiber, Egret, Aframe, PlayCanvas y Babylon.js. \n\nThree.js es una biblioteca JavaScript de código abierto.', 'https://i.stack.imgur.com/g31dW.png', '2023-09-21 14:59:25', '2023-09-21 15:00:28', 5),
(5, 'Theatre.js - JavaScript Animation Library', 'Theatre.js es una biblioteca con un conjunto de herramientas de diseño de movimiento profesional. Con ella, puedes diseñar escenas cinemáticas y deliciosas interacciones de interfaz de usuario.\n\nPara utilizar Theatre.js con HTML y JavaScript plano, puede añadir su enlace CDN a la sección head de su documento HTML.\n\nCaracterísticas principales:\n* Funciona con varios marcos y bibliotecas de JavaScript: Puedes usar Theatre.js con React Three Fiber y THREE.js. \n* Personalizable: Esta biblioteca cuenta con un editor de secuencias de última generación que te ayuda a bloquear secuencias en cuestión de segundos. También puedes ajustar con precisión cada fotograma de tu aplicación mediante el editor de gráficos. \n* Extensible: Theatre.js dispone de varias extensiones que aumentan su usabilidad. Puede utilizar sus herramientas o añadir extensiones a esta biblioteca. \n\nTheatre.js es una biblioteca de código abierto. ', 'https://www.theatrejs.com/images/landing-page/intro-05-poster.png', '2023-09-21 15:00:28', '2023-09-21 15:00:28', 2);

INSERT INTO `authors` (`id`, `name`, `lastname`, `email`, `createdAt`, `updatedAt`) VALUES
(1, 'Juan', 'Cito', 'juan_cito@gmail.com', '2023-09-21 14:52:31', '2023-09-21 14:52:31'),
(2, 'Sofia', 'Mota', 'sofiamota@gmail.com', '2023-09-21 14:55:54', '2023-09-21 14:55:54'),
(3, 'Mateo', 'Rodriguez', 'materod@gmail.com', '2023-09-21 14:55:54', '2023-09-21 14:55:54'),
(4, 'Diego', 'Luz', 'dieluz@hotmail.com', '2023-09-21 14:55:54', '2023-09-21 14:55:54'),
(5, 'Belen', 'Vazquez', 'beluvazquez@gmail.com', '2023-09-21 14:55:54', '2023-09-21 14:55:54');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;