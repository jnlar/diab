<?php

namespace App\Entity;

use App\Repository\ReadingRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReadingRepository::class)]
class Reading
{
  #[ORM\Id]
  #[ORM\GeneratedValue]
  #[ORM\Column(type: 'integer')]
  private $id;

  #[ORM\Column(type: 'float')]
  private $reading;

  #[ORM\Column(type: 'datetime')]
  private $date;

  // NOTE: we only use this for when we need to create dummy data
  //public function __construct($reading, $date)
  //{
  //  $this->reading = $reading;
  //  $this->date = $date;
  //}

  public function getId(): ?int
  {
    return $this->id;
  }

  public function getReading(): ?float
  {
    return $this->reading;
  }

  /**
   * @param string $reading
   * @return $this
   */
  public function setReading(string $reading): self
  {
    $this->reading = $reading;

    return $this;
  }

  /**
   * @return \DateTimeInterface|null
   */
  public function getDate(): ?\DateTimeInterface
  {
    return $this->date;
  }

  public function setDate(\DateTimeInterface $date): self
  {
    $this->date = $date;

    return $this;
  }
}
