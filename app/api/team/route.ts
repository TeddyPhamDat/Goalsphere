

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");
	if (!id) {
		return new Response(JSON.stringify({ error: "Missing team id" }), { status: 400 });
	}
	try {
		// Thay YOUR_API_TOKEN bằng token thật nếu cần
		const apiRes = await fetch(`https://api.football-data.org/v4/teams/${id}`, {
			headers: {
				"X-Auth-Token": process.env.FOOTBALL_DATA_API_TOKEN || "d0ce288006114da59af12b87226e26a3"
			}
		});
		if (!apiRes.ok) {
			return new Response(JSON.stringify({ error: "Upstream API error" }), { status: apiRes.status });
		}
		const data = await apiRes.json();
		return new Response(JSON.stringify(data), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
	}
}
