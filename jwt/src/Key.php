<?php

namespace Firebase\JWT;

use OpenSSLAsymmetricKey;
use OpenSSLCertificate;
use TypeError;
use InvalidArgumentException;

class Key
{
    /**
     * @param string|OpenSSLAsymmetricKey|OpenSSLCertificate|array<mixed> $keyMaterial
     * @param string $algorithm
     */
    public function __construct(
         $keyMaterial,
         $algorithm
    ) {
        if (empty($keyMaterial)) {
            throw new InvalidArgumentException('Key material must not be empty');
        }

        if (empty($algorithm)) {
            throw new InvalidArgumentException('Algorithm must not be empty');
        }
    }

    /**
     * Return the algorithm valid for this key
     *
     * @return string
     */
    public function getAlgorithm()
    {
        return $this->algorithm;
    }

    /**
     * @return string|OpenSSLAsymmetricKey|OpenSSLCertificate|array<mixed>
     */
    public function getKeyMaterial()
    {
        return $this->keyMaterial;
    }
}
