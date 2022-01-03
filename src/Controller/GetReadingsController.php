<?php

namespace App\Controller;

use App\Repository\ReadingRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;

class GetReadingsController extends AbstractController
{
  /**
   * @param ReadingRepository $repository
   * @param SerializerInterface $serializer
   * @return JsonResponse
   * @Route("/get/readings", name="get_readings", methods={"GET"})
   */
  public function getReadings(ReadingRepository $repository, SerializerInterface $serializer): JsonResponse
  {
    $readings = $repository->getReadingsDesc();

    $data = $serializer->serialize($readings, JsonEncoder::FORMAT);

    /**
     * NOTE: should we make outermost array of response associative?
     * calls to this api will require authentication eventually
     * see: https://cheatsheetseries.owasp.org/cheatsheets/AJAX_Security_Cheat_Sheet.html#always-return-json-with-an-object-on-the-outside
     */
    return new JsonResponse($data, Response::HTTP_OK, [], true);
  }

}
