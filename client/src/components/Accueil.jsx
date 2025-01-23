import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


function Accueil() {

 return (
    <div>
      <section className ='section1'>
        <div className="element">
        <h1>Work Hard To</h1>
        <h2>Get Better Life</h2>
        <p>
          Starting a workout routine can be challenging, especially when you've
          had trouble maintaining motivation in the past or if you’re working
          out for the first time. While the benefits of regular exercise are
          countless, finding the drive to get to the gym or go for a run isn’t
          always easy.
        </p>
        <Button variant='danger' ><Link className="btnlog" to={"/login"}>Get Started</Link></Button>  
        </div>
      </section>
      <section className='section2 py-8'>
            <h1 className='text-h1'>POURQUOI NOUS CHOISIR </h1>
              <p className='texting'>
                Nous sommes fiers de vous offrir une expérience unique qui vous
                permettra de profiter pleinement de votre temps et de vos ressources.
                <br></br>
                Notre plateforme vous permet de :
              </p>
              <div className="card-glo">
              <div id='card-global'>
              <Card style={{ width: '400px'}} id='card' className="custom-card">
            <Card.Body>
              <Card.Title id='number'>01</Card.Title>
              <Card.Text className='custom-text'>
              Acheter des produits de qualité
              </Card.Text>
              <Card.Text className='text'>
              Vous pouvez parcourir les différentes catégories, comparer les prix et effectuer vos achats en toute confiance
              </Card.Text>
            </Card.Body>
          </Card>
              <Card style={{ width: '400px'}} id='card'>
            <Card.Body>
              <Card.Title id='number'>02</Card.Title>
              <Card.Text  className='custom-text'>
              Accéder à des cours et exercices en ligne
              </Card.Text>
              <Card.Text className='text'>
              Améliorez vos compétences et développez de nouvelles passions grâce à notre plateforme        </Card.Text>
            </Card.Body>
          </Card>
              <Card style={{ width: '400px'}} id='card'>
            <Card.Body>
              <Card.Title id='number'>03</Card.Title>
              <Card.Text  className='custom-text'>
              Trouver des services locaux
              </Card.Text>
              <Card.Text className='text'>
              Simplifiez votre recherche de services locaux en utilisant notre plateforme        </Card.Text>
            </Card.Body>
          </Card>
              <Card style={{ width: '400px'}} id='card'>
            <Card.Body>
              <Card.Title id='number'>04</Card.Title>
              <Card.Text  className='custom-text'>
              Réserver des activités de loisirs
              </Card.Text>
              <Card.Text className='text'>
              Découvrez une multitude d'activités de loisirs passionnantes à travers notre plateforme        </Card.Text>
            </Card.Body>
          </Card>
          </div>
            </div>
            </section>
            <section className='section3'>
            <h1 className='text-h1 pou'>ENTRAîNEURS</h1>
            <div className="card-container">
            <div className="card-c" style={{width: "20rem"}}>
  <img src="oo.avif" className="card-img-top" alt="..." height={370}/>
  <div className="card-body">
    <h5 className="card-title" style={{color: "rgb(187, 167, 18)"}}>Emma Dubois</h5>
    <p className="card-text">Emma est une coach de Pilates expérimentée avec plus de 10 ans d'expérience .  </p>
    <p className="card-text">Salaire par mois : 90 €</p>
  </div>
</div>
            <div className="card-c" style={{width: "20rem"}}>
  <img src="vitt.png" className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title" style={{color: "rgb(187, 167, 18)"}}>Julien Martin</h5>
    <p className="card-text">Julien est un coach de musculation avec plus de 12 ans d'expérience dans le domaine du fitness . </p>
    <p className="card-text">Salaire par mois : 70 €</p>
  </div>
</div>
            <div className="card-c" style={{width: "20rem"}}>
  <img src="coach2.jpg" className="card-img-top" alt="..." height="400px" />
  <div className="card-body">
    <h5 className="card-title" style={{color: "rgb(187, 167, 18)"}}>Sarah Lefèvre</h5>
    <p className="card-text">Sarah est une coach de yoga certifiée qui pratique le yoga depuis 15 ans.  </p>
    <p className="card-text">Salaire par mois : 80 € </p>
  </div>
</div>
            </div>
            </section>
        </div>
  );
};

export default Accueil