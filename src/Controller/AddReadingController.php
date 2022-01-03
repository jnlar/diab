<?php

namespace App\Controller;

use Doctrine\Persistence\ManagerRegistry;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Reading;
use DateTime;

class AddReadingController extends AbstractController
{
  /**
   * @param ManagerRegistry $manager
   * @param Request $request
   * @return Response
   * @throws Exception
   * @Route("/add/reading", name="add_reading")
   */
  public function index(ManagerRegistry $manager, Request $request): Response
  {
    $readingClass = new Reading();
    $entityManager = $manager->getManager();

    $reading = $request->toArray();
    try {
      $datetimeObject = new DateTime($reading[1]);

      if (!is_numeric($reading[0]) && !is_float($reading[0])) {
        throw new Exception();
      }

      $readingClass->setReading($reading[0]);
      $readingClass->setDate($datetimeObject);

      $entityManager->persist($readingClass);
      $entityManager->flush();

      return $this->json([
        'message' => ['text' => 'Added reading', 'level' => 'success']
      ], Response::HTTP_OK);
    } catch (Exception $e) {
      return $this->json([
        'message' => ['text' => 'something happened...', 'level' => 'error']
      ], Response::HTTP_BAD_REQUEST);
    }

  }

}
