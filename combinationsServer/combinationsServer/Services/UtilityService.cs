using combinationsServer.Models;
using System.Numerics;

namespace combinationsServer.Services
{
    public class UtilityService
    {
        public BigInteger Factorial(int n)
        {
            BigInteger fact = 1;
            for (int i = 1; i <= n; i++)
            {
                fact *= i;
            }
            return fact;
        }

    }
}
