import Link from "next/link";

const CoffeeStore = () => {
  return (
    <div>
      <a href="/">home</a>
      <Link href={"/"}>home</Link>
      <Link href={"/coffee-store/dynamic"} prefetch={true} scroll={false}>dynamic</Link>
    </div>
  );
};

export default CoffeeStore;
