<?php

namespace App\Controller;

use App\Entity\Reading;
use Doctrine\ORM\ORMInvalidArgumentException;
use Doctrine\Persistence\ManagerRegistry;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class RemoveReadingController extends AbstractController
{
  /**
   * receive JSON, instead of dynamic route, this way we can
   * remove multiple readings from one request
   *
   * @param ManagerRegistry $doctrine
   * @param Request $request
   * @param LoggerInterface $logger
   * @return Response
   * @Route("/reading/remove", name="remove_reading", methods={"POST"})
   */
  public function index(ManagerRegistry $doctrine, Request $request, LoggerInterface $logger): Response
  {
    $deleteIdsJson = $request->getContent();
    $logger->info("METHOD: {POST} PATH: '/reading/remove' DATA: $deleteIdsJson");

    $deleteIds = $request->toArray();

    try {
      $entityManager = $doctrine->getManager();

      foreach ($deleteIds as $_ => $id) {
        $readings = $entityManager->getRepository(Reading::class)->find($id);
        $entityManager->remove($readings);
        $entityManager->flush();
      }
    } catch (ORMInvalidArgumentException $e) {
      return $this->json([
        'message' => ['text' => 'Database stuff did not happen!', 'level' => 'error']
      ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    return $this->json([
      'message' => ['text' => 'Removed reading/s', 'level' => 'success']
    ], Response::HTTP_OK);
  }

}

