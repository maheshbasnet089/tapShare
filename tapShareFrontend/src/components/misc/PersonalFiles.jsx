import ShareAllLinksContainer from "./ShareAllLinksContainer";
import ShareSingleLinkContainer from "./ShareSingleLinkContainer";
import TopBadge from "./TopBadge";
export default function PersonalFiles({files}) {
  return (
    <>
      <TopBadge />
      <ShareAllLinksContainer />
      <ShareSingleLinkContainer files={files}/>
    </>
  );
}
